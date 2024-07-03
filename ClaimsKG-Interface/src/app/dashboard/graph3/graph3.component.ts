import * as XLSX from 'xlsx';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';

@Component({
  selector: 'app-graph3',
  standalone: true,
  imports: [],
  templateUrl: './graph3.component.html',
  styleUrl: './graph3.component.css'
})
export class Graph3Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_source_label"
  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredSourceLabel$.subscribe(()=>{

      this.data = this.filtreService.fetchDataPerSourceLabel().subscribe((response) => {
        this.data = response;
        this.buildChart(this.data)
      });
      //this.ngOnResearch();
    });
  }

  ngOnInit(): void {

    this.fetchData();
  }

  private buildChart(data_1 : any): void {
  var sourceNames: string[] = [];
  var trueCounts: any[] = [];
  var falseCounts: any[] = [];
  var mixedCounts: any[] = [];
  var otherCounts: any[] = [];

  for (let i = 0; i < data_1.length; i++) {
    if(data_1[i]['label']=="TRUE"){
      trueCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="FALSE"){
      falseCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="MIXTURE"){
      mixedCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
    }else{
      otherCounts.push({"source":data_1[i]['source'],"counts":data_1[i]['counts']})
    }
  }
  
  sourceNames = trueCounts.map(dictionary => dictionary["source"])

  var data: Data[]= [
    {
      name:'True',
      x: trueCounts.map(dictionary => dictionary["source"]),
      y: trueCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      marker: { color: '#4CB140' } 

    },
    {
      name:'False',
      x: falseCounts.map(dictionary => dictionary["source"]),
      y: falseCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      marker: { color: '#cc0000' } 
    },
    {
      name:'Mixture',
      x: mixedCounts.map(dictionary => dictionary["source"]),
      y: mixedCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      marker: { color: '#519DE9' } 
    },
    {
      name:'Other',
      x: otherCounts.map(dictionary => dictionary["source"]),
      y: otherCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      marker: { color: '#F4C145' } 
    }
  ];
    const layout: Partial<Layout> = { 
      title: 'The sources of our claims',
      barmode: 'stack',  // How do you want the bars to be positioned 
      margin: { t: 50, b: 50, l: 50, r: 200 }, 
      legend: {
          x: 5.1, 
          y: 1,
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          bordercolor: 'rgba(0, 0, 0, 0.5)', 
          borderwidth: 1 
      },
      yaxis:{
        title: "Claims Count"
      },
    };
    const config = {
      responsive: true,
    };
    Plotly.newPlot('graph3', data,layout,config);
  }
  fetchData() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.data=data;
        this.buildChart(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  downloadTSV(): void {
    const data = this.data;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";
    tsvContent += "Source\tLabel\tQuantity\n";
    data.forEach((row: any) => {
      const rowArray = [row['source'], row['label'], row['counts']];
      tsvContent += rowArray.join("\t") + "\n";
    });

    const encodedUri = encodeURI(tsvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.tsv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  }
  downloadCSV(): void {
    const data = this.data;
    let csvContent = "data:text/csv;charset=utf-8,";

    // Ajouter les en-têtes au contenu CSV
    csvContent += "Source,Label,Quantity\n";
    data.forEach((row: any) => {
      const rowArray = [row['source'], row['label'], row['counts']];
      csvContent += rowArray.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}
downloadExcel(): void {
  const data = this.data.map((row: any) => ({
      Source: row['source'],
      Label: row['label'],
      Quantity: row['counts']
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "data.xlsx");
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}
}
