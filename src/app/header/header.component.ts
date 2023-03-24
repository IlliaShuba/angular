import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() logo_path: string;
  @Input() display_hello_world:boolean = false;
  @Output() changeHelloWorld = new EventEmitter();
  @Input() list_display: boolean;
  @Output() list_display_emitter = new EventEmitter();

  listChange() {
    this.list_display_emitter.emit();
  }

  stateChanged() {
    this.changeHelloWorld.emit(this.display_hello_world);
  };
}
