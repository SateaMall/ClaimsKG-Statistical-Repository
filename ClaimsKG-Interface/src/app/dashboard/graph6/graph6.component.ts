import { Component, OnInit } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph6',
  standalone: true,
  templateUrl: './graph6.component.html',
  styleUrls: ['./graph6.component.css']
})
export class Graph6Component implements OnInit {
  data: any;
  private apiUrl = "http://127.0.0.1:5000/topics-by-quantity";

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredPerLangue$.subscribe(()=>{

      this.data = this.filtreService.fetchDataPerTopic().subscribe((response) => {
        console.log("Fetched Data:", response);  // Debugging line
        this.data = response;
        this.buildChart(this.data)

      });

    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private buildChart(chartData: any): void {
    const topics = chartData.map((item: any) => item.topics);
    const trueCounts = chartData.map((item: any) => item.true);
    const falseCounts = chartData.map((item: any) => item.false);
    const mixtureCounts = chartData.map((item: any) => item.mixture);
    const otherCounts = chartData.map((item: any) => item.other);

    const data: Partial<Data>[] = [
      { x: topics, y: trueCounts, type: 'bar', name: 'True', marker: { color: '#4CB140' } },
      { x: topics, y: falseCounts, type: 'bar', name: 'False', marker: { color: '#cc0000' } },
      { x: topics, y: mixtureCounts, type: 'bar', name: 'Mixture', marker: { color: '#519DE9' } },
      { x: topics, y: otherCounts, type: 'bar', name: 'Other', marker: { color: '#F4C145' } }
    ];

    const layout: Partial<Layout> = {
      title: 'Number of claims by topic',
      barmode: 'stack',
      xaxis: { title: 'Topics' },
      yaxis: { title: 'Claims Count' },
      margin: { t: 50, b: 100, l: 50, r: 200 }, 
      legend: {
          x: 5.1, 
          y: 1,
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          bordercolor: 'rgba(0, 0, 0, 0.5)', 
          borderwidth: 1 
      }
    };

    const config = {
      responsive: true
    };

    Plotly.newPlot('graph6', data, layout, config);
  }

  fetchData(): void {
    fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          this.data = data;
          this.buildChart(this.data);
        } else {
          console.error("Data is not in expected format or empty");
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  downloadTSV(): void {
    const data = this.data;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";
  
    // Add headers to TSV content
    tsvContent += "Topic\tTrue\tFalse\tMixture\tOther\n";
  
    data.forEach((row: any) => {
      const rowArray = [row['topics'], row['true'], row['false'], row['mixture'], row['other']];
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
    csvContent += "Topic,True,False,Mixture,Other\n";
    data.forEach((row: any) => {
      const rowArray = [row['topics'], row['true'], row['false'], row['mixture'], row['other']];
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
        Topic: row['topics'],
        True: row['true'],
        False: row['false'],
        Mixture: row['mixture'],
        Other: row['other']
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