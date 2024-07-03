import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgFor, NgIf,  CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuggestionService } from '../../compare-search/suggestion.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SearchService } from '../../compare-search/search.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Graph1Component } from "../graph1/graph1.component";
import { Graph2Component } from "../graph2/graph2.component";
import { Graph3Component } from "../graph3/graph3.component";
@Component({
    selector: 'app-by-entity-by-topic',
    standalone: true,
    templateUrl: './by-entity-by-topic.component.html',
    styleUrl: './by-entity-by-topic.component.css',
    imports: [MatTooltipModule, MatChipsModule, MatIconModule, CommonModule, NgIf, FormsModule, NgFor, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, NavigationBarComponent, Graph3Component, Graph2Component, Graph1Component]
})
export class ByEntityByTopicComponent  {
  topics: string[] = [];

  selectedTopic1: string ="";
  selectedTopic2: string ="";

  formEntity1 = new FormControl({ value: '', disabled: true });
  formEntity2 = new FormControl({ value: '', disabled: true });

  suggestions1!: Observable<string[]>;
  suggestions2!: Observable<string[]>;

  selectedOptions1: string[]=[] ;
  selectedOptions2: string[]=[] ;
  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";

  entityData11: any;
  entityData21: any;
  entityData31: any;

  entityData12: any;
  entityData22: any;
  entityData32: any;
  
  constructor(private suggestionService: SuggestionService, private searchService: SearchService){

    this.suggestions1 = this.formEntity1.valueChanges.pipe(
        startWith(''),
        map(value => value || ''), // Ensure the value is never null
        debounceTime(300), // Add a delay to prevent calling API on each keystroke
        distinctUntilChanged(), // Skip consecutive duplicate values
        filter(term => term.trim().length >= 2), // Check that the term is at least two characters long
        switchMap((term: string) =>
            this.suggestionService.getSuggestionsTopic(term,this.selectedTopic1) || of([]) // Call your service only if the above filter passes
        ), 
        catchError(error => {
            console.error(error);
            return of([]);
        })
    );

    this.suggestions2 = this.formEntity2.valueChanges.pipe(
      startWith(''),
      map(value => value || ''), // Ensure the value is never null
      debounceTime(300), // Add a delay to prevent calling API on each keystroke
      distinctUntilChanged(), // Skip consecutive duplicate values
      filter(term => term.trim().length >= 2), // Check that the term is at least two characters long
      switchMap((term: string) =>
          this.suggestionService.getSuggestionsTopic(term,this.selectedTopic2) || of([]) // Call your service only if the above filter passes
      ),
      catchError(error => {
          console.error(error);
          return of([]);
      })
  );
    this.searchService.getTopics().subscribe((data) => {
      this.topics = data;
    });
  }
  onTopicChange() {
    if (this.selectedTopic1) {
      this.formEntity1.enable();
    } 
    else {
      this.formEntity1.disable();
    }
    if (this.selectedTopic2) {
      this.formEntity2.enable();
    } 
    else {
      this.formEntity2.disable();
    }
  }
  optionClicked(event: Event, option: string, number: number) {
    event.stopPropagation(); // Prevents the mat-option click from closing the autocomplete panel
    this.toggleSelection(option, number);
  }
  // Adds the suggestion after selecting it to the top if the option was aleady chosen or add it at the bottom if not
  toggleSelection(option: string, number: number) {
    if (number==1){
      if(this.selectedOptions1){
        const idx = this.selectedOptions1.indexOf(option);
        if (idx > -1) {
          this.selectedOptions1.splice(idx, 1);
        } else {
          this.selectedOptions1.push(option);
        }
        this.formEntity1.setValue('');}
    }
    if (number==2){
      if(this.selectedOptions2){
        const idx = this.selectedOptions2.indexOf(option);
        if (idx > -1) {
          this.selectedOptions2.splice(idx, 1);
        } else {
          this.selectedOptions2.push(option);
        }
        this.formEntity2.setValue('');}
    }
  }


  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.firstDate=first_date;
    this.lastDate=last_date;
       if(this.selectedTopic1 && this.selectedOptions1 && this.selectedTopic2 && this.selectedOptions2){


  /*********************************  Retreiving Data For First Comparision Group ************************************/

      this.searchService.searchTopicEntity1(this.selectedOptions1, this.firstDate, this.lastDate,this.selectedTopic1)
      .subscribe({
        next: (result1) => {
          // Handle the data received from the search
          this.entityData11=result1; // Emit the result to parent component
        },
        error: (error1) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error1);
        }
      });
    
    
    this.searchService.searchTopicEntity2(this.selectedOptions1, this.firstDate, this.lastDate,this.selectedTopic1)
      .subscribe({
        next: (result2) => {
          // Handle the data received from the search
          this.entityData21=result2;
        },
        error: (error2) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error2);
        }
      });
    
    this.searchService.searchTopicEntity3(this.selectedOptions1, this.firstDate, this.lastDate,this.selectedTopic1)
      .subscribe({
        next: (result3) => {
          // Handle the data received from the search
          this.entityData31=result3;
        },
        error: (error3) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error3);
        }
      });


  /*********************************  Retreiving Data For Second Comparision Group ************************************/

      this.searchService.searchTopicEntity1(this.selectedOptions2, this.firstDate, this.lastDate,this.selectedTopic2)
      .subscribe({
        next: (result1) => {
          // Handle the data received from the search
          this.entityData12=result1; // Emit the result to parent component
        },
        error: (error1) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error1);
        }
      });
    
    
    this.searchService.searchTopicEntity2(this.selectedOptions2, this.firstDate, this.lastDate,this.selectedTopic2)
      .subscribe({
        next: (result2) => {
          // Handle the data received from the search
          this.entityData22=result2;
        },
        error: (error2) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error2);
        }
      });
    
    this.searchService.searchTopicEntity3(this.selectedOptions2, this.firstDate, this.lastDate,this.selectedTopic2)
      .subscribe({
        next: (result3) => {
          // Handle the data received from the search
          this.entityData32=result3;
        },
        error: (error3) => {
          // Handle any errors that occur during the search
          console.error('Search failed:', error3);
        }
      });
    }

  }

}
