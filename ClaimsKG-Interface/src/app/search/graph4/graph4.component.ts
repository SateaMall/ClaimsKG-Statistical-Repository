import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph5',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.css']
})
export class Graph4Component implements OnChanges {
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }

  private buildChart(data_1: any): void {
    var languageNames: string[] = [];
    var trueCounts: any[] = [];
    var falseCounts: any[] = [];
    var mixedCounts: any[] = [];
    var otherCounts: any[] = [];

    for (let i = 0; i < data_1.length; i++) {
        if (data_1[i]['label'] === "TRUE") {
            trueCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else if (data_1[i]['label'] === "FALSE") {
            falseCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else if (data_1[i]['label'] === "MIXTURE") {
            mixedCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        } else {
            otherCounts.push({ "language": data_1[i]['reviewBodyLang'], "counts": data_1[i]['counts'] });
        }
    }

    languageNames = Array.from(new Set(trueCounts.map(dictionary => dictionary["language"])
        .concat(falseCounts.map(dictionary => dictionary["language"]))
        .concat(mixedCounts.map(dictionary => dictionary["language"]))
        .concat(otherCounts.map(dictionary => dictionary["language"]))));

    var data: Data[] = [
        {
            name: 'True',
            x: trueCounts.map(dictionary => dictionary["counts"]),
            y: trueCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h',
            marker: { color: '#4CB140' } 
        },
        {
            name: 'False',
            x: falseCounts.map(dictionary => dictionary["counts"]),
            y: falseCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h',
            marker: { color: '#cc0000' } 
        },
        {
            name: 'Mixture',
            x: mixedCounts.map(dictionary => dictionary["counts"]),
            y: mixedCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h',
            marker: { color: '#519DE9' } 
        },
        {
            name: 'Other',
            x: otherCounts.map(dictionary => dictionary["counts"]),
            y: otherCounts.map(dictionary => dictionary["language"]),
            type: 'bar',
            orientation: 'h',
            marker: { color: '#F4C145' } 
        }
    ];

    const layout: Partial<Layout> = {
        title: 'The languages of the claims',
        barmode: 'stack',
        xaxis:{
          title: "Claims Count"
        },

        margin: { t: 50, b: 50, l: 100, r: 200 }, 
        legend: {
            x: 5.1, 
            y: 1,
            bgcolor: 'rgba(255, 255, 255, 0.5)', 
            bordercolor: 'rgba(0, 0, 0, 0.5)', 
            borderwidth: 1 ,
        },
        bargap: 0.4,  // Increase gap between dataset groups
        bargroupgap: 0.3,
    };

    const config = {
        responsive: true,
    };

    Plotly.newPlot('graph4', data, layout, config);
  }
  downloadTSV(): void {
    const data = this.entityData;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";
    tsvContent += "Language\tLabel\tQuantity\n";
    data.forEach((row: any) => {
      const rowArray = [row['reviewBodyLang'], row['label'], row['counts']];
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
    const data = this.entityData;
    let csvContent = "data:text/csv;charset=utf-8,";
  
    // Add headers to CSV content
    csvContent +=  "Language\tLabel\tQuantity\n";
    data.forEach((row: any) => {
      const rowArray = [row['reviewBodyLang'], row['label'], row['counts']];
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
  const data = this.entityData.map((row: any) => ({
      Language: row['reviewBodyLang'],
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
