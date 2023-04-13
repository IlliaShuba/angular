import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id: any;
  users: any[];

  user: any;

  constructor(private route: ActivatedRoute,
              private staticRoute: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let arrayFromLocalStorage: any = localStorage.getItem('users');
    this.users = JSON.parse(arrayFromLocalStorage);
    for (let el of this.users) {
      if (el.id === parseInt(this.id)) this.user = el;
    }

    if (this.user === undefined) {
      this.staticRoute.navigate(['/**'])
    }
  }

}
