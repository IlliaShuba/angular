import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: {price: number, title: string, description: string, text: string, show_detail: boolean, left: number};

  display_element: boolean = true;
}
