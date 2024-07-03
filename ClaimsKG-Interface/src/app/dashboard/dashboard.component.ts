import { Component, inject } from '@angular/core';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { Graph4Component } from './graph4/graph4.component';
import { Graph5Component } from './graph5/graph5.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { AppComponent } from '../app.component';
import { ClaimsSummaryComponent } from './claims-summary/claims-summary.component';
import { FiltreComponent } from './filtre/filtre.component';
import { Graph6Component } from "./graph6/graph6.component";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [MatTooltipModule, Graph1Component, Graph2Component, Graph3Component, Graph4Component, Graph5Component, AppComponent, FiltreComponent, NavigationBarComponent, ClaimsSummaryComponent, Graph6Component]
})
export class DashboardComponent {

  

}
