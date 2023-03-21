import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bucket-list-app';
  username: string = "";
  
  constructor() {
    let username:any =  window.localStorage.getItem('Username');
    if (username) {
      this.username = username;
    }
  }
}
