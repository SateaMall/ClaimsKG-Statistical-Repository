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
  @Input() entityData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entityData'] && this.entityData) {
      this.buildChart(this.entityData);
    }
  }

  buildChart(data: any): void{
    console.log (data[0]);
    const sampleDates: string[] = [];
    const trueCounts: any[] = [];
    const falseCounts: any[] = [];
    const mixedCounts: any[] = [];
    const otherCounts: any[] = [];
    const allCounts: any[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const currentDate = data[i]['date1'];
      if (!sampleDates.includes(currentDate)) {
        sampleDates.push(currentDate);
        trueCounts.push({ date1: currentDate, counts: 0, keywords:"N/A", keywords_count: 0, });
        falseCounts.push({ date1: currentDate, counts: 0, keywords:"N/A", keywords_count: 0, });
        mixedCounts.push({ date1: currentDate, counts: 0, keywords:"N/A", keywords_count: 0, });
        otherCounts.push({ date1: currentDate, counts: 0, keywords:"N/A", keywords_count: 0, });
        allCounts.push({ date1: currentDate, counts: 0, keywords:"N/A", keywords_count: 0, });
      }
    
      if (data[i]['label'] == 'TRUE') {
        for (let j = 0; j < trueCounts.length; j++) {
          if (trueCounts[j].date1 === currentDate) {
            trueCounts[j].counts += data[i]['counts'];
            trueCounts[j].keywords= data[i]['keywords'];
            trueCounts[j].keywords_count= data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] == 'FALSE') {
        for (let j = 0; j < falseCounts.length; j++) {
          if (falseCounts[j].date1 === currentDate) {
            falseCounts[j].counts += data[i]['counts'];
            falseCounts[j].keywords= data[i]['keywords'];
            falseCounts[j].keywords_count= data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] == 'MIXTURE') {
        for (let j = 0; j < mixedCounts.length; j++) {
          if (mixedCounts[j].date1 === currentDate) {
            mixedCounts[j].counts += data[i]['counts'];
            mixedCounts[j].keywords= data[i]['keywords'];
            mixedCounts[j].keywords_count= data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] == 'OTHER') {
        for (let j = 0; j < otherCounts.length; j++) {
          if (otherCounts[j].date1 === currentDate) {
            otherCounts[j].counts += data[i]['counts'];
            otherCounts[j].keywords= data[i]['keywords'];
            otherCounts[j].keywords_count= data[i]['popularity_percentage'];
            break;
          }
        }
      } else if (data[i]['label'] == 'ALL') {
        for (let j = 0; j < allCounts.length; j++) {
          if (allCounts[j].date1 === currentDate) {
            allCounts[j].counts += data[i]['counts'];
            allCounts[j].keywords= data[i]['keywords'];
            allCounts[j].keywords_count= data[i]['popularity_percentage'];
            break;
        }
      }
    }
  }
  console.log(otherCounts)
  const traces: Data[] = [
    {
      type: 'scatter',
      mode: 'lines',
      name: 'True',
      x: trueCounts.map(dictionary => dictionary["date1"]),
      y: trueCounts.map(dictionary => dictionary["counts"]),
      line: { color: '#4CB140' },
      hovertemplate: '%{x}<br>True Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}% <extra></extra>',
      customdata: trueCounts.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]])
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'False',
      x: falseCounts.map(dictionary => dictionary["date1"]),
      y: falseCounts.map(dictionary => dictionary["counts"]),
      line: { color: '#cc0000' },
      hovertemplate: '%{x}<br>False Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: falseCounts.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]])
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Mixed',
      x: mixedCounts.map(dictionary => dictionary["date1"]),
      y: mixedCounts.map(dictionary => dictionary["counts"]),
      line: { color: '#519DE9' },
      hovertemplate: '%{x}<br>Mixed Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: mixedCounts.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]])
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Others',
      x: otherCounts.map(dictionary => dictionary["date1"]),
      y: otherCounts.map(dictionary => dictionary["counts"]),
      line: { color: '#F4C145' },
      hovertemplate: '%{x}<br>Other Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: otherCounts.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]])
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'All',
      x: allCounts.map(dictionary => dictionary["date1"]),
      y: allCounts.map(dictionary => dictionary["counts"]),
      line: { color: '#009596', dash: 'dash' },
      hovertemplate: '%{x}<br>All Claims: %{y}<br>Popular keyword: %{customdata[0]}<br>Popularity percentage: %{customdata[1]}%<extra></extra>',
      customdata: allCounts.map(dictionary => [dictionary["keywords"], dictionary["keywords_count"]])
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
    const data = this.entityData;
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
    const data = this.entityData;
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
  const data = this.entityData.map((row: any) => ({
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
