import { NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plotly, { Data, Layout } from 'plotly.js-basic-dist-min';
@Component({
  selector: 'app-graph5',
  standalone: true,
  imports: [NgIf],
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.css']
})
export class Graph4Component implements OnChanges {
  @Input() entityData1: any;
  @Input() entityData2: any;

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['entityData1'] || changes['entityData2']) && this.entityData1 && this.entityData2) {
      this.buildChart(this.entityData1,this.entityData2);
    }
  }
  private buildChart(data_1: any, data_2: any): void {
    const languageNames: Set<string> = new Set();
  
    const languageCountsG1: { [language: string]: number } = {};
    const languageCountsG2: { [language: string]: number } = {};
  
    const aggregateCounts = (data: any, languageCounts: { [language: string]: number }) => {
      for (let i = 0; i < data.length; i++) {
        const language = data[i]['reviewBodyLang'];
        languageNames.add(language);
        if (!languageCounts[language]) {
          languageCounts[language] = 0;
        }
        languageCounts[language] += data[i]['counts'];
      }
    };
  
    // Process both datasets
    aggregateCounts(data_1, languageCountsG1);
    aggregateCounts(data_2, languageCountsG2);
  
    const createTrace = (name: string, languageCounts: { [language: string]: number }, color: string, offsetGroup: string): Data => {
      const languages = Array.from(languageNames);
      return {
        name: name,
        x: languages.map(language => languageCounts[language] || 0),
        y: languages,
        type: 'bar',
        orientation: 'h',
        marker: { color: color },
        offsetgroup: offsetGroup,
      } as Data;
    };
  
    const data: Data[] = [
      createTrace('Group 1', languageCountsG1, '#148080', '1'),
      createTrace('Group 2', languageCountsG2, '#01c9c9', '2')
    ];


    const layout: Partial<Layout> = {
      title: 'The languages of the claims',
      barmode: 'group',  // Stack bars within each group
      margin: { t: 50, b: 50, l: 50, r: 200 },
      bargap: 0.2,  // Adjust as needed
      bargroupgap: 0.3,  // Adjust as needed
      xaxis: {
        title: 'Claims Count',
        showgrid: true,
        zeroline: true
      },
      yaxis: {
        type: 'category',
        categoryorder: 'total ascending',
      },
      legend: {
        x: 5.1, 
        y: 1,
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        bordercolor: 'rgba(0, 0, 0, 0.5)',
        borderwidth: 1
      },

    };
  
    const config = {
      responsive: true,
    };
  
    Plotly.newPlot('graph4', data, layout, config);
  }
  
}
