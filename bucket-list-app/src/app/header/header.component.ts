import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  username: string = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.setAuthStatus()
    this.router.events.subscribe(event => {
      this.setAuthStatus()
    })
  }

  setAuthStatus(): void {
    this.loggedIn = window.localStorage.getItem('Token') != null;
    let tempUser:any = window.localStorage.getItem('Username');
    if (tempUser == null) {
      tempUser =  "";
    }
    this.username = tempUser;
  }

  onLoggedOut(loggedOut:boolean): void {
    this.username=""
    this.loggedIn = false
  }

}
