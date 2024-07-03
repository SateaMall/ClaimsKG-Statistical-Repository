import * as XLSX from 'xlsx';
import { Component, OnInit } from '@angular/core';
import Plotly, { Data, Layout} from 'plotly.js-basic-dist-min';
import { FiltreService } from '../filtre.service';

@Component({
  selector: 'app-graph4',
  standalone: true,
  imports: [],
  templateUrl: './graph4.component.html',
  styleUrl: './graph4.component.css'
})
export class Graph4Component implements OnInit{
  data: any;
  private apiUrl = "http://127.0.0.1:5000/json_per_langue_label"

  constructor(private filtreService: FiltreService){
    this.filtreService.submitTriggeredPerLangue$.subscribe(()=>{
      this.data = this.filtreService.fetchDataPerLangue().subscribe((response) => {
        this.data = response;
        this.buildChart(this.data)

      });

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
      trueCounts.push({"langue":data_1[i]['reviewBodyLang'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="FALSE"){
      falseCounts.push({"langue":data_1[i]['reviewBodyLang'],"counts":data_1[i]['counts']})
    }else if(data_1[i]['label']=="MIXTURE"){
      mixedCounts.push({"langue":data_1[i]['reviewBodyLang'],"counts":data_1[i]['counts']})
    }else{
      otherCounts.push({"langue":data_1[i]['reviewBodyLang'],"counts":data_1[i]['counts']})
    }
  }

      // Trier les listes de manière décroissante
    trueCounts.sort((a, b) => b.counts - a.counts);
    falseCounts.sort((a, b) => b.counts - a.counts);
    mixedCounts.sort((a, b) => b.counts - a.counts);
    otherCounts.sort((a, b) => b.counts - a.counts);

    // Ne garder que les 10 premières valeurs de chaque liste
    trueCounts = trueCounts.slice(0, 5);
    falseCounts = falseCounts.slice(0, 5);
    mixedCounts = mixedCounts.slice(0, 5);
    otherCounts = otherCounts.slice(0, 5);
  
  sourceNames = trueCounts.map(dictionary => dictionary["langue"])

  var data: Data[]= [
    {
      name:'True',
      y: trueCounts.map(dictionary => dictionary["langue"]),
      x: trueCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      orientation: 'h',    
      marker: { color: '#4CB140' } 
    },

    {
      name:'False',
      y: falseCounts.map(dictionary => dictionary["langue"]),
      x: falseCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      orientation: 'h', 
      marker: { color: '#cc0000' } 
       },
      
    {
      name:'Mixture',
      y: mixedCounts.map(dictionary => dictionary["langue"]),
      x: mixedCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      orientation: 'h',
      marker: { color: '#519DE9' } 
        },
    {
      name:'Other',
      y: otherCounts.map(dictionary => dictionary["langue"]),
      x: otherCounts.map(dictionary => dictionary["counts"]),
      type: 'bar',
      orientation: 'h',
      marker: { color: '#F4C145' },
    }
  ];

    const layout: Partial<Layout> = { 
      title: 'The languages of our claims',
      barmode: 'stack',  // How do you want the bars to be positioned 
      margin: { t: 50, b: 50, l: 100, r: 200 }, 
      legend: {
          x: 5, 
          y: 1,
          bgcolor: 'rgba(255, 255, 255, 0.5)', 
          bordercolor: 'rgba(0, 0, 0, 0.5)', 
          borderwidth: 1 
      },
      xaxis:{
        title: "Claims Count"
      },
    };
    const config = {
      responsive: true,
    };
    Plotly.newPlot('graph4', data,layout,config);
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
    const data = this.data;
    let csvContent = "data:text/csv;charset=utf-8,";

    // Ajouter les en-têtes au contenu CSV
    csvContent += "Language,Label,Quantity\n";
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
  const data = this.data.map((row: any) => ({
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
