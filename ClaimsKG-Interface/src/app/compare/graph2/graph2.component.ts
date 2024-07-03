import { NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph2',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph2.component.html',
  styleUrl: './graph2.component.css'
})
export class Graph2Component implements OnChanges {
  @Input() entityData1: any;
  @Input() name:any;
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef; //Had to use this to be able to render this graph two times in one page
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData1'] && this.entityData1 ) {
      this.buildChart(this.entityData1);
    }
  }

  private buildChart(data_1: any): void {
    const values: number[] = [];
    const labels: string[] = ["TRUE", "FALSE", "MIXTURE", "OTHER"];
    const colors: string[] = ['#4CB140', '#cc0000', '#519DE9', '#F4C145'];

    // Initialize counts for each label
    const counts: { [key: string]: number } = { "TRUE": 0, "FALSE": 0, "MIXTURE": 0, "OTHER": 0 };

    // Aggregate counts
    for (let i = 0; i < data_1.length; i++) {
        const label = data_1[i]['label'];
        counts[label] += data_1[i]['counts'];
    }

    // Populate values array
    for (const label of labels) {
        values.push(counts[label]);
    }

    const data: Data[] = [{
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
    const layout: Partial<Layout> = {
      title: 'Percentage of labels for'+this.name,
      showlegend: true,
      xaxis: {
        type: 'date',
        title: 'Date'
      },
      yaxis: {
        title: 'Number of Claims'
      },
      margin: { t: 50, b: 50, l: 50, r: 200 }, 
      legend: {
        x: 5.1,
        y: 1,
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        bordercolor: 'rgba(0, 0, 0, 0.5)',
        borderwidth: 1
      }
    };


    var config = { responsive: true }

    Plotly.newPlot(this.graphContainer.nativeElement, data, layout, config); // Use the ViewChild reference
}
downloadTSV(): void {
  const data = this.entityData1;
  let tsvContent = "data:text/tab-separated-values;charset=utf-8,";
  tsvContent += "Label\tQuantity\n";
  data.forEach((row: any) => {
    const rowArray = [row['label'], row['counts']];
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
  csvContent +=  "Label\tQuantity\n";
  data.forEach((row: any) => {
    const rowArray = [row['label'], row['counts']];
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
