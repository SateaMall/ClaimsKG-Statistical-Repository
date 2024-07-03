import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph5',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph5.component.html',
  styleUrl: './graph5.component.css'
})
export class Graph5Component {
  @Input() entityData1: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData1'] && this.entityData1) {
      this.buildChart(this.entityData1);
    }
  }
  
  private buildChart(data_1: any): void {
    const values: number[] = []
    const labels: string[] = []
    const colors: string[] = []

    for (let i = 0; i < data_1.length; i++){
      labels.push(data_1[i]['entity'])
      values.push(data_1[i]['total_counts'])
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
    title: 'Top 50 Entities Shared Between Both Topics',
    margin: { "t": 50, "b": 50, "l": 50, "r": 50 },
    showlegend: true,
    height: 900,
  };

  var config = {responsive: true}

  Plotly.newPlot('graphTopic4', data, layout,config);
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
downloadTSV(): void {
  const data = this.entityData1;
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
  const data = this.entityData1;
  let csvContent = "data:text/csv;charset=utf-8,";

  // Add headers to CSV content
  csvContent +=  "Entity\tQuantity\n";
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
const data = this.entityData1.map((row: any) => ({
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
