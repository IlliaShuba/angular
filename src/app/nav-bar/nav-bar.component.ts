import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {
  @Input() links: {label: string, active: boolean}[];
  //@Output() changeActive = new EventEmitter<string>();

  onEvent(label: string) {
    for (let prod of this.links) {
      prod.active = prod.label == label;
    }

    // this.changeActive.emit(label)
  }

}
