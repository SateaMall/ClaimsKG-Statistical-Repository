import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { Graph1Component } from "../graph1/graph1.component";
import { Graph2Component } from "../graph2/graph2.component";
import { Graph3Component } from "../graph3/graph3.component";
import { Graph4Component } from "../graph4/graph4.component";
@Component({
    selector: 'app-by-entity',
    standalone: true,
    templateUrl: './by-entity.component.html',
    styleUrl: './by-entity.component.css',
    imports: [MatTooltipModule, MatChipsModule, MatIconModule, CommonModule, NgIf, FormsModule, NgFor, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, Graph1Component, Graph2Component, Graph3Component, Graph4Component]
})
export class ByEntityComponent {
  formEntity1= new FormControl('');
  formEntity2= new FormControl('');
  suggestions1!: Observable<string[]>;
  suggestions2!: Observable<string[]>;
  selectedOptionsFirst: string[]=[] ;
  selectedOptionsSecond: string[]=[] ;
  submitted : boolean = false;
  firstDate:string="";
  lastDate:string="";
  entityData11: any;
  entityData12: any;
  entityData21: any;
  entityData22: any;
  entityData31: any;
  entityData32: any;
  entityData41: any;
  entityData42: any;

  
  
  
  constructor(private suggestionService: SuggestionService, private searchService: SearchService){

  this.suggestions1 = this.formEntity1.valueChanges.pipe(
    startWith(''),
    map(value => value || ''), // Ensure the value is never null
    debounceTime(300), // Add a delay to prevent calling API on each keystroke
    distinctUntilChanged(), // Skip consecutive duplicate values
    filter(term => term.trim().length >= 2), // Check that the term is at least two characters long
    switchMap((term: string) =>
        this.suggestionService.getSuggestions(term) || of([]) // Call your service only if the above filter passes
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
          this.suggestionService.getSuggestions(term) || of([]) // Call your service only if the above filter passes
      ),
      catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }

  optionClicked(event: Event, option: string, number: number) {
    event.stopPropagation(); // Prevents the mat-option click from closing the autocomplete panel
    this.toggleSelection(option, number);
  }
  // Adds the suggestion after selecting it to the top if the option was aleady chosen or add it at the bottom if not
  toggleSelection(option: string, number: number) {
    if (number==1){
      if(this.selectedOptionsFirst){
        const idx = this.selectedOptionsFirst.indexOf(option);
        if (idx > -1) {
          this.selectedOptionsFirst.splice(idx, 1);
        } else {
          this.selectedOptionsFirst.push(option);
        }
        this.formEntity1.setValue('');}
    }
    if (number==2){
      if(this.selectedOptionsSecond){
        const idx = this.selectedOptionsSecond.indexOf(option);
        if (idx > -1) {
          this.selectedOptionsSecond.splice(idx, 1);
        } else {
          this.selectedOptionsSecond.push(option);
        }
        this.formEntity2.setValue('');}
    }
  }

  submit( first_date:string, last_date:string){
    this.submitted=true;
    this.firstDate=first_date;
    this.lastDate=last_date;
    if(this.selectedOptionsFirst && this.selectedOptionsSecond){

  /*********************************  Retreiving  Data For First Comparision Group ************************************/

      this.searchService.searchEntity1(this.selectedOptionsFirst, this.firstDate, this.lastDate)
    .subscribe({
    next: (result) => {
      this.entityData11=result; 
    },
    error: (error) => {
    
      console.error('Search failed:', error);
    }
  });


  this.searchService.searchEntity2(this.selectedOptionsFirst, this.firstDate, this.lastDate)
  .subscribe({
  next: (result2) => {
  
    this.entityData21=result2; 
  },
  error: (error) => {
  
    console.error('Search failed:', error);
  }
});

this.searchService.searchEntity3(this.selectedOptionsFirst, this.firstDate, this.lastDate)
.subscribe({
next: (result3) => {
  this.entityData31=result3; 
},
error: (error) => {
  console.error('Search failed:', error);
}
});

this.searchService.searchEntity4(this.selectedOptionsFirst, this.firstDate, this.lastDate)
.subscribe({
next: (result4) => {
  this.entityData41=result4; 
},
error: (error) => {
  console.error('Search failed:', error);
}
});


  /*********************************  Retreiving Data For Second Comparision Group ************************************/


this.searchService.searchEntity1(this.selectedOptionsSecond, this.firstDate, this.lastDate)
.subscribe({
next: (result) => {
  this.entityData12=result; 
},
error: (error) => {

  console.error('Search failed:', error);
}
});

this.searchService.searchEntity2(this.selectedOptionsSecond, this.firstDate, this.lastDate)
.subscribe({
next: (result2) => {
  this.entityData22=result2; 
},
error: (error) => {
  console.error('Search failed:', error);
}
});


this.searchService.searchEntity3(this.selectedOptionsSecond, this.firstDate, this.lastDate)
.subscribe({
next: (result3) => {
  this.entityData32=result3; 
},
error: (error) => {
  console.error('Search failed:', error);
}
});



this.searchService.searchEntity4(this.selectedOptionsSecond, this.firstDate, this.lastDate)
.subscribe({
next: (result4) => {
  this.entityData42=result4; 
},
error: (error) => {
  console.error('Search failed:', error);
}
});

}

}

  }




