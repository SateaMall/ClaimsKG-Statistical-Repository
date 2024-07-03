import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import Plotly, { Data } from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [],
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_entity"
  private http = inject(HttpClient)

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredTopEntity$.subscribe(()=>{

      this.data = this.filtreService.fetchDataTopEntity().subscribe((response) => {
        this.data = response;
        this.buildChart(this.data)
      });
      //this.ngOnResearch();
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(data1: any): void {
    const values: number[] = []
    const labels: string[] = []
    const colors: string[] = []

    for (let i = 0; i < data1.length; i++){
      labels.push(data1[i]['entity'])
      values.push(data1[i]['counts'])
      colors.push(this.generateRandomColor())
    }



    const data: Data[]= [{
      type: 'pie',
      values: values, // Example counts for different themes
      labels: labels, // Example theme names
      textinfo: 'label+percent',  // Show label and the percentage
      insidetextorientation: 'radial', // Orientation of the text value
      hoverinfo: 'label+value', // Show theme name and count on hover
      textposition: 'inside',
      automargin: true,
      marker: {
        colors: colors // Custom colors for each slice
    }
    }];

  const layout = {
    title: 'Top 50 - Most Used Entity',
    margin: { "t": 50, "b": 50, "l": 50, "r": 200 },
    showlegend: true,
    height: 900,
  };

  var config = {responsive: true}

  Plotly.newPlot('graph2', data, layout,config);
}
generateRandomColor(): string {
  const characters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    color += characters[randomIndex];
  }
  return color;
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
  tsvContent += "Entity\tQuantity\n";
  data.forEach((row: any) => {
    const rowArray = [row['entity'], row['counts']];
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
  csvContent += "Entity,Quantity\n";
  data.forEach((row: any) => {
    const rowArray = [row['entity'], row['counts']];
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
      Entity: row['entity'],
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

