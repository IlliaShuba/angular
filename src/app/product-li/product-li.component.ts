import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-product-li',
  templateUrl: './product-li.component.html',
  styleUrls: ['./product-li.component.scss']
})

export class ProductLiComponent {
  @Input() product: {name: string, price: number, description: string, text: string, show_detail: boolean, left: number};

  display_element: boolean = true;
}
