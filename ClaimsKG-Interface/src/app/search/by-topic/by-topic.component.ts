import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../compare-search/search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Graph1Component } from "../graph1/graph1.component";
import { Graph2Component } from "../graph2/graph2.component";
import { Graph3Component } from "../graph3/graph3.component";
import { Graph5Component } from "../graph5/graph5.component";

@Component({
    selector: 'app-by-topic',
    standalone: true,
    templateUrl: './by-topic.component.html',
    styleUrl: './by-topic.component.css',
    imports: [MatTooltipModule, MatIconModule, CommonModule, NgIf, FormsModule, NgFor, ReactiveFormsModule, Graph1Component, Graph3Component, Graph2Component, Graph5Component]
})
export class ByTopicComponent {
  topics: string[] = [];
  selectedTopic: string ="";

  formEntity= new FormControl('');

  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";
  entityData: any;
  entityData2: any;
  entityData3: any;
  entityData4: any;
  
  constructor(private searchService: SearchService){
    this.searchService.getTopics().subscribe((data) => {
      this.topics = data;
    });
  }
  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.firstDate=first_date;
    this.lastDate=last_date;
    if(this.selectedTopic){

      //First graph
      this.searchService.searchTopic1(this.firstDate, this.lastDate,this.selectedTopic)
    .subscribe({
    next: (result) => {
      this.entityData=result;
     
    },
    error: (error) => {
      // Handle any errors that occur during the search
      console.error('Search failed:', error);
    }
  });

    // Second Graph
    this.searchService.searchTopic2(this.firstDate, this.lastDate,this.selectedTopic)
    .subscribe({
    next: (result2) => {
      this.entityData2=result2;
     
    },
    error: (error) => {
      // Handle any errors that occur during the search
      console.error('Search failed:', error);
    }
  });

  //Theird graph
  this.searchService.searchTopic3(this.firstDate, this.lastDate,this.selectedTopic)
  .subscribe({
  next: (result3) => {
    this.entityData3=result3;
   
  },
  error: (error) => {
    // Handle any errors that occur during the search
    console.error('Search failed:', error);
  }
});

  //Forth graph
  this.searchService.searchTopic4(this.firstDate, this.lastDate,this.selectedTopic)
  .subscribe({
  next: (result4) => {
    this.entityData4=result4;
   
  },
  error: (error) => {
    // Handle any errors that occur during the search
    console.error('Search failed:', error);
  }
});
}

  }

}


