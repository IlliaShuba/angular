import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() links: {label: string, active: boolean}[];
  @Input() users: {name: string, dateOfBirth: Date, id: number, salary: number, workingHours: number, lastname: string}[];

  onEvent(label: string) {
    for (let prod of this.links) {
      prod.active = prod.label == label;
    }
  }
}
