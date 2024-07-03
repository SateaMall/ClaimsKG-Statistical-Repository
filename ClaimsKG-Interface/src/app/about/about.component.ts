import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html',
    styleUrl: './about.component.css',
    imports: [NavigationBarComponent]
})
export class AboutComponent {

}
