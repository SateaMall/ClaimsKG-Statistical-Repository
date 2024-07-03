import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltreService } from '../filtre.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './filtre.component.html',
  styleUrls: ['./filtre.component.css']
})
export class FiltreComponent {
  filtreService = inject(FiltreService);
  displayDate: boolean = true;
  suggestions!: Observable<string[]>;
  applyForm = new FormGroup({
    granularite: new FormControl(''),
    date1: new FormControl(''),
    date2: new FormControl(''),

  });

  constructor() {
  }


  displayElement(): void {
    this.displayDate = !this.displayDate;
  }

  onSubmit() {
    var granularite = '';
    
    if (this.applyForm.value.granularite === 'Annee') {
      granularite = 'annee';
    } else if (this.applyForm.value.granularite === 'Mois') {
      granularite = 'mois';
    }
    console.log("Granularité : "+granularite)
    this.filtreService.onSubmit(
      granularite,
      this.applyForm.value.date2 ?? '',
      this.applyForm.value.date1 ?? ''
    );
  }

  isOption1Checked() {
    return this.applyForm.get('selectedOption')?.value === 'Annee';
  }

  onClick() {
    // Custom logic on click
  }
}
