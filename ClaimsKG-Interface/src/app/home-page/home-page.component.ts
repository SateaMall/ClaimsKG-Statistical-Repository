import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [NavigationBarComponent]
})
export class HomePageComponent implements OnInit{
  data: any;
  private resume = "http://127.0.0.1:5000/resume"

  numberClaims: any;
  numberClaimsReview: any;
  since: any;
  to: any;

  ngOnInit(): void {
    this.fetchData();
  }
  constructor(private router: Router){}
  navigate(path: string) {
    this.router.navigate([path]);
}
  private buildSummary(data1: string,data2: string,data3: string,data4: string): void {

    const startDate = new Date(data3);
    const endDate = new Date(data4);
    const formattedStartDate = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });

    const formattedEndDate = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
  });
    this.numberClaims = " Claims number <b> &nbsp; (" + `${data1}` + ")</b>";
    this.numberClaimsReview = " Claims review number <b> &nbsp;  (" + `${data2}`+ ")</b>";
    this.since = " Since <b> &nbsp;  " + `${formattedStartDate}` + "</b>";
    this.to =" To <b> &nbsp; " + `${formattedEndDate}` + "</b>";
}

fetchData() {
  fetch(this.resume)
    .then(response => response.json())
    .then(data => {
      const result = data[0]; // Access the first object in the array
      this.buildSummary(
        result['Numbers of claims '], // Note the space
        result['Numbers of claims review '], // Note the space
        result['Since '], // Note the space
        result['to '] // Note the space
      );
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
}

