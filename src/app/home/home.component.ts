import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Input() logo_path: string = '../../assets/logo.png';
  display_hello_world: boolean = false;
  list_display: boolean = false;

  changeDisplayState() {
    this.display_hello_world = !this.display_hello_world;
  }

  links = [
    {
      label: 'First link',
      routerLink: '/home',
      active: true
    },
    {
      label: 'Second link',
      active: false
    },
    {
      label: 'Third link',
      active: false
    }
  ]

  productsData = [
    {
      name: 'TELEPHONE',
      description: 'Short description about this product',
      price: 5.55,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi dignissimos dolorem dolorum ' +
        'eaque eos eum illo incidunt iste minima mollitia non quae repellat repellendus sit suscipit tenetur ullam, veniam!',
      show_detail: false,
      left: 0
    },
    {
      name: 'LAPTOP',
      description: 'Short description about this product',
      price: 6.20,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis illo in ipsam ipsum, ' +
        'nesciunt nobis tempore. Ab corporis dolorum eos iste molestiae nemo numquam officiis. Accusantium laudantium natus perspiciatis.',
      show_detail: false,
      left:1
    },
    {
      name: 'PC',
      description: 'PC description',
      price: 7.20,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis illo in ipsam ipsum, ' +
        'nesciunt nobis tempore. Ab corporis dolorum eos iste molestiae nemo numquam officiis. Accusantium laudantium natus perspiciatis.',
      show_detail: false,
      left: 3
    }
  ]

  changeDisplayList() {
    this.list_display = !this.list_display;
  }

  // ChangeStateLinks(label: string) {
  //   for (let link of this.links) {
  //     link.active = link.label == label;
  //   }
  // }
}
