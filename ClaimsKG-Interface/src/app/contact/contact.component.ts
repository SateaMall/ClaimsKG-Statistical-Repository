import { Component } from '@angular/core';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    imports: [NavigationBarComponent]
})
export class ContactComponent {

}
