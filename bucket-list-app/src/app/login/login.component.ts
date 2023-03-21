import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { IUser } from '../shared/interfaces'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl('')
  })

  error:string = ""

  emailExists: boolean = false
  passwordExists: boolean = false
  submitValid: boolean = false

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(
      data => {
        this.emailExists = data.email != ""
        this.passwordExists = data.password != ""

        this.submitValid = this.emailExists && this.passwordExists
      }
    );
  }

  login(): void {
    var user: IUser = {
      email: this.loginForm.value.email ? this.loginForm.value.email : "",
      username: '',
      password: this.loginForm.value.password ? this.loginForm.value.password : ''
    };
    this.auth.userLogin(user).subscribe({
      next: (data:any) => {
        console.log(data);
        let token = data.token;
        let username = data.userCredentials.username;
        if (window) {
          window.localStorage.setItem('Token', token);
          window.localStorage.setItem('Username', username);
        }
        this.router.navigate([ '/home' ]);
      },
      error: (err: HttpErrorResponse) => {
        if (err.error.msg) {
          this.error = err.error.msg;
        } else {
          this.error = 'Something Went Wrong!';
        }
      }
    })
  }

}
