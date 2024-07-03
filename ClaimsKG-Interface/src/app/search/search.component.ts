import { Component } from '@angular/core';
import { ByTopicComponent } from "./by-topic/by-topic.component";
import { ByEntityComponent } from "./by-entity/by-entity.component";
import { ByEntityByTopicComponent } from "./by-entity-by-topic/by-entity-by-topic.component";
import { NgSwitch } from '@angular/common';
import { NgSwitchCase } from '@angular/common';
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
    selector: 'app-compare',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [MatTooltipModule, ByTopicComponent, ByEntityComponent, ByEntityByTopicComponent, NgSwitch, NgSwitchCase, NavigationBarComponent]
})
export class SearchComponent {
  activeButton: string = 'entity';

  setActive(buttonId: string): void {
    this.activeButton = buttonId;
  }
}
