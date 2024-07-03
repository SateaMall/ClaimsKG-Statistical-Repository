import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-graph3',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph3.component.html',
  styleUrl: './graph3.component.css'
})
export class Graph3Component implements OnChanges {
  @Input() entityData1: any;
  @Input() entityData2: any;

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['entityData1'] || changes['entityData2']) && this.entityData1 && this.entityData2) {
      this.buildChart(this.entityData1,this.entityData2);
    }
  }
  private buildChart(data_1: any, data_2: any): void {
    const sourceNames: Set<string> = new Set();
  
    const sourceCountsG1: { [source: string]: number } = {};
    const sourceCountsG2: { [source: string]: number } = {};
  
    const aggregateCounts = (data: any, sourceCounts: { [source: string]: number }) => {
      for (let i = 0; i < data.length; i++) {
        const source = data[i]['source'];
        sourceNames.add(source);
        if (!sourceCounts[source]) {
          sourceCounts[source] = 0;
        }
        sourceCounts[source] += data[i]['counts'];
      }
    };
  
    // Process both datasets
    aggregateCounts(data_1, sourceCountsG1);
    aggregateCounts(data_2, sourceCountsG2);
  
    const createTrace = (name: string, sourceCounts: { [source: string]: number }, color: string, offset: string): Data => {
      const sources = Array.from(sourceNames);
      return {
        name: name,
        x: sources,
        y: sources.map(source => sourceCounts[source] || 0),
        type: 'bar',
        marker: { color: color },
        offsetgroup: offset,
      } as Data;
    };
  
    const data: Data[] = [
      createTrace('Group 1', sourceCountsG1, '#148080', '1'),
      createTrace('Group 2', sourceCountsG2, '#01c9c9', '2')
    ];
  
    const layout: Partial<Layout> = {
      title: 'The sources of the claims',
      barmode: 'group',  // Group bars side by side
      margin: { t: 50, b: 50, l: 50, r: 200 }, 
      xaxis: {
        type: 'category',
        categoryorder: 'total descending'
      },
      yaxis:{
        title: 'Claims Count'
      },
      legend: {
        x: 5.1, 
        y: 1,
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        bordercolor: 'rgba(0, 0, 0, 0.5)',
        borderwidth: 1
      },
      bargap: 0.4,  // Increase gap between dataset groups
      bargroupgap: 0.3,
    };

    const config = {
      responsive: true,
    };

    Plotly.newPlot('graph3', data, layout, config);
  
  }
}
