import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() username:string = "";
  @Output() loggedOut = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  logout():void {
    console.log("called")
    localStorage.removeItem('Token');
    localStorage.removeItem('Username');
    this.router.navigate([ '/start' ]);
    this.loggedOut.emit(true);
  }
}
