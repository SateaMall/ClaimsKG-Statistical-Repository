import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

import { Observable, forkJoin } from 'rxjs';
import { FiltreService } from '../filtre.service';

@Component({
  selector: 'app-claims-summary',
  standalone: true,
  imports: [],
  templateUrl: './claims-summary.component.html',
  styleUrl: './claims-summary.component.css'
})
export class ClaimsSummaryComponent {

  data: any;
  private apiUrlFalse = "http://127.0.0.1:5000/number_false"
  private apiUrlTrue = "http://127.0.0.1:5000/number_true"
  private apiUrlMixture = "http://127.0.0.1:5000/number_mixture"
  private apiUrlOther = "http://127.0.0.1:5000/number_other"
  trueNumber: any;
  mixtureNumber: any;
  falseNumber: any;
  otherNumber: any;
  divColor = "white";

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredLabel$.subscribe(()=>{

      const observables: Observable<any[]>[] = this.filtreService.fetchDataSummary();

      forkJoin(observables).subscribe(
        (responses: any[][]) => {

          this.data = responses;
          const true_counts = this.data[0]["counts"]
          const false_counts = this.data[1]["counts"]
          const mixture_counts = this.data[2]["counts"]
          const other_counts = this.data[3]["counts"]

          this.buildSummary(
            true_counts,
            false_counts,
            mixture_counts,
            other_counts
          );
        },
        (error: any) => {
        }
      );
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private buildSummary(data1: string,data2: string,data3: string,data4: string): void {
    var total = parseInt(data1)+parseInt(data2)+parseInt(data3)+parseInt(data4);
    this.trueNumber = data1 + " true claims <b> (" + `${Math.round(((parseInt(data1) / total) * 100) * 100) / 100} %` + ")</b>";
    this.falseNumber = data2+" false claims <b> (" + `${Math.round(((parseInt(data2) / total) * 100) * 100) / 100} %` + ")</b>";
    this.mixtureNumber = data3+" mixture claims <b> (" + `${Math.round(((parseInt(data3) / total) * 100) * 100) / 100} %` + ")</b>";
    this.otherNumber = data4+" other claims <b> (" + `${Math.round(((parseInt(data4) / total) * 100) * 100) / 100} %` + ")</b>";
}

  fetchData() {
    fetch(this.apiUrlTrue)
      .then(response => response.json())
      .then(data1 => {
        fetch(this.apiUrlFalse)
          .then(response => response.json())
          .then(data2 => {
            fetch(this.apiUrlMixture)
              .then(response => response.json())
              .then(data3 => {
                fetch(this.apiUrlOther)
                  .then(response => response.json())
                  .then(data4 => {
                    console.log()
                    this.buildSummary(data1['counts'],data2['counts'],data3['counts'],data4['counts'])
                  })
              })
          })
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  changeColor(event: any) {
    alert(event.innerHTML)
    // Get the current background color of the clicked div
    var clickedDiv = event.target;
    var currentColor = clickedDiv.style.background;

    // Check if the current background color is red
    if (currentColor === 'white') {
        // Change the background color to another color
        clickedDiv.style.background = 'red';
    } else {
        // Change the background color to red
        clickedDiv.style.background = 'white';
    }
}

}
