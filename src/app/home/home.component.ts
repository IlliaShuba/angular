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

  users = [
    {
      id: 1,
      name: 'Victor',
      lastname: 'Velichko',
      dateOfBirth: new Date("2/1/1990"),
      salary: 50000,
      workingHours: 123456789
    },
    {
      id: 10,
      name: 'Kate',
      lastname: 'Doe',
      dateOfBirth: new Date("6/6/1980"),
      salary: 88000,
      workingHours: 12345
    }
  ]

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
      price: 100,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi dignissimos dolorem dolorum ' +
        'eaque eos eum illo incidunt iste minima mollitia non quae repellat repellendus sit suscipit tenetur ullam, veniam!',
      show_detail: false,
      left: 0
    },
    {
      name: 'LAPTOP',
      description: 'Short description about this product',
      price: 500,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis illo in ipsam ipsum, ' +
        'nesciunt nobis tempore. Ab corporis dolorum eos iste molestiae nemo numquam officiis. Accusantium laudantium natus perspiciatis.',
      show_detail: false,
      left:1
    },
    {
      name: 'PC',
      description: 'PC description',
      price: 600,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda blanditiis illo in ipsam ipsum, ' +
        'nesciunt nobis tempore. Ab corporis dolorum eos iste molestiae nemo numquam officiis. Accusantium laudantium natus perspiciatis.',
      show_detail: false,
      left: 3
    }
  ]

  changeDisplayList() {
    this.list_display = !this.list_display;
  }

}
