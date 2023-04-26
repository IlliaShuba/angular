import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {
  @Input() links: {label: string, active: boolean}[];
  @Input() users: {name: string, dateOfBirth: Date, id: number, salary: number, workingHours: number, lastname: string}[];

  onEvent(label: string) {
    for (let prod of this.links) {
      prod.active = prod.label == label;
    }

  }

}
