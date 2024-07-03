import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph1',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph1.component.html',
  styleUrls: ['./graph1.component.css']
})
export class Graph1Component implements OnChanges {
  @Input() entityData1: any;
  @Input() entityData2: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData1'] || changes['entityData2'] && this.entityData1 && this.entityData2) {
      this.buildChart(this.entityData1,this.entityData2);
    }
  }

    
  private buildChart(data_1: any, data_2: any): void {
  const sampleDates1: string[] = [];

  const sampleDates2: string[] = [];

  const trueCountsG1: any[] = [];
  const falseCountsG1: any[] = [];
  const mixedCountsG1: any[] = [];
  const otherCountsG1: any[] = [];
  const allCountsG1: any[] = [];

  const trueCountsG2: any[] = [];
  const falseCountsG2: any[] = [];
  const mixedCountsG2: any[] = [];
  const otherCountsG2: any[] = [];
  const allCountsG2: any[] = [];

  const processData = (dates: any,data: any, trueCounts: any[], falseCounts: any[], mixedCounts: any[], otherCounts: any[], allCounts: any[]) => {
    for (let i = 0; i < data.length; i++) {
      const currentDate = data[i]['date1'];
      if (!dates.includes(currentDate)) {
        dates.push(currentDate);
        trueCounts.push({ date1: currentDate, counts: 0, keywords: "N/A", keywords_count: 0 });
        falseCounts.push({ date1: currentDate, counts: 0, keywords: "N/A", keywords_count: 0 });
        mixedCounts.push({ date1: currentDate, counts: 0, keywords: "N/A", keywords_count: 0 });
        otherCounts.push({ date1: currentDate, counts: 0, keywords: "N/A", keywords_count: 0 });
        allCounts.push({ date1: currentDate, counts: 0, keywords: "N/A", keywords_count: 0 });
      }

      if (data[i]['label'] === 'TRUE') {
        for (let j = 0; j < trueCounts.length; j++) {
          if (trueCounts[j].date1 === currentDate) {
            trueCounts[j].counts += data[i]['counts'];
            trueCounts[j].keywords = data[i]['keywords'];
            trueCounts[j].keywords_count = data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] === 'FALSE') {
        for (let j = 0; j < falseCounts.length; j++) {
          if (falseCounts[j].date1 === currentDate) {
            falseCounts[j].counts += data[i]['counts'];
            falseCounts[j].keywords = data[i]['keywords'];
            falseCounts[j].keywords_count = data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] === 'MIXTURE') {
        for (let j = 0; j < mixedCounts.length; j++) {
          if (mixedCounts[j].date1 === currentDate) {
            mixedCounts[j].counts += data[i]['counts'];
            mixedCounts[j].keywords = data[i]['keywords'];
            mixedCounts[j].keywords_count = data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] === 'OTHER') {
        for (let j = 0; j < otherCounts.length; j++) {
          if (otherCounts[j].date1 === currentDate) {
            otherCounts[j].counts += data[i]['counts'];
            otherCounts[j].keywords = data[i]['keywords'];
            otherCounts[j].keywords_count = data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] === 'ALL') {
        for (let j = 0; j < allCounts.length; j++) {
          if (allCounts[j].date1 === currentDate) {
            allCounts[j].counts += data[i]['counts'];
            allCounts[j].keywords = data[i]['keywords'];
            allCounts[j].keywords_count = data[i]['popularity_percentage'];
            break;
          }
        }
      }
    }
  };

  // Process both datasets
  processData(sampleDates1, data_1, trueCountsG1, falseCountsG1, mixedCountsG1, otherCountsG1, allCountsG1);
  processData(sampleDates2, data_2, trueCountsG2, falseCountsG2, mixedCountsG2, otherCountsG2, allCountsG2);

  // Combine traces for both datasets
  const traces: any[] = [
    {
      type: 'scatter',
      mode: 'lines',
      name: 'True-G1',
      x: trueCountsG1.map(dictionary => dictionary["date1"]),
      y: trueCountsG1.map(dictionary => dictionary["counts"]),
      line: { color: '#4b8f43' },
      hovertemplate: '%{x}<br>True-G1 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}% <extra></extra>',
      customdata: trueCountsG1.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'False-G1',
      x: falseCountsG1.map(dictionary => dictionary["date1"]),
      y: falseCountsG1.map(dictionary => dictionary["counts"]),
      line: { color:  'rgb(134, 40, 40)' },
      hovertemplate: '%{x}<br>False-G1 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: falseCountsG1.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Mixed-G1',
      x: mixedCountsG1.map(dictionary => dictionary["date1"]),
      y: mixedCountsG1.map(dictionary => dictionary["counts"]),
      line: { color: '#296097' },
      hovertemplate: '%{x}<br>Mixed-G1 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: mixedCountsG1.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Other-G1',
      x: otherCountsG1.map(dictionary => dictionary["date1"]),
      y: otherCountsG1.map(dictionary => dictionary["counts"]),
      line: { color: '#8f7535' },
      hovertemplate: '%{x}<br>Other-G1 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: otherCountsG1.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'All-G1',
      x: allCountsG1.map(dictionary => dictionary["date1"]),
      y: allCountsG1.map(dictionary => dictionary["counts"]),
      line: { color: '#148080', dash: 'dash' },
      hovertemplate: '%{x}<br>All-G1 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: allCountsG1.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: true // Visible by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'True-G2',
      x: trueCountsG2.map(dictionary => dictionary["date1"]),
      y: trueCountsG2.map(dictionary => dictionary["counts"]),
      line: { color: '#4fc941' },
      hovertemplate: '%{x}<br>True-G2 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}% <extra></extra>',
      customdata: trueCountsG2.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'False-G2',
      x: falseCountsG2.map(dictionary => dictionary["date1"]),
      y: falseCountsG2.map(dictionary => dictionary["counts"]),
      line: { color: '#d42c2c'},
      hovertemplate: '%{x}<br>False-G2 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: falseCountsG2.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Mixed-G2',
      x: mixedCountsG2.map(dictionary => dictionary["date1"]),
      y: mixedCountsG2.map(dictionary => dictionary["counts"]),
      line: { color: '#519DE9'},
      hovertemplate: '%{x}<br>Mixed-G2 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: mixedCountsG2.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Other-G2',
      x: otherCountsG2.map(dictionary => dictionary["date1"]),
      y: otherCountsG2.map(dictionary => dictionary["counts"]),
      line: { color: '#F4C145'},
      hovertemplate: '%{x}<br>Other-G2 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: otherCountsG2.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: 'legendonly' // Hidden by default
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'All-G2',
      x: allCountsG2.map(dictionary => dictionary["date1"]),
      y: allCountsG2.map(dictionary => dictionary["counts"]),
      line: { color: '#01c9c9', dash: 'dash' },
      hovertemplate: '%{x}<br>All-G2 Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: allCountsG2.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]]),
      visible: true // Visible by default
    }
  ];

  const layout: Partial<Layout> = {
    title: 'Number of Claims Over Time with the major subjects*',
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

  Plotly.newPlot('graph1', traces, layout);
}

  
  downloadTSV(): void {
    const data = this.entityData1;
    let tsvContent = "data:text/tab-separated-values;charset=utf-8,";

    // Add headers to TSV content
    tsvContent += "Date\tLabel\tQuantity\tPopular_keyword\tPopularity_percentage\n";
    data.forEach((row: any) => {
      const rowArray = [row['date1'], row['label'], row['counts'], row['keywords'], row['popularity_percentage']];
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
    csvContent += "Date,Label,Quantity,Popular_keyword,Popularity_percentage\n";
    data.forEach((row: any) => {
      const rowArray = [row['date1'], row['label'], row['counts'], row['keywords'], row['popularity_percentage']];
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
      Date: row['date1'],
      Label: row['label'],
      Quantity: row['counts'],
      Popular_keyword: row['keywords'],
      Popularity_percentage: row['popularity_percentage']
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
