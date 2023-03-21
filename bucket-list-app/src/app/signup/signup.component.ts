import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { IUser } from '../shared/interfaces'
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  signUpForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    confirmpassword: new FormControl('')
  })

  error:string = ""

  usernameExists: boolean = false
  emailExists: boolean = false
  passwordExists: boolean = false
  passwordWeak: boolean = false
  passwordsDiff: boolean = false
  submitValid: boolean = false
  
  ngOnInit(): void {
    this.signUpForm.valueChanges.subscribe(
      data => {
        if (data.password != data.confirmpassword && data.password && data.password != "" && data.confirmpassword != "") {
          this.passwordsDiff = data.password != data.confirmpassword
        }
        this.usernameExists = data.username != ""
        this.emailExists = data.email != ""
        this.passwordExists = data.password != ""

        this.submitValid = this.usernameExists && this.emailExists && this.passwordExists && !this.passwordsDiff
      }
    );
  }

  // TODO:
  // add checks for password to match confirm password

  createUser(): void {
    var user: IUser = {
      email: this.signUpForm.value.email ? this.signUpForm.value.email : "",
      username: this.signUpForm.value.username ? this.signUpForm.value.username :'',
      password: this.signUpForm.value.password ? this.signUpForm.value.password : ''
    };
    console.log(user)
    this.auth.createNewUser(user).subscribe({
      next: (data:any) => {
        console.log(data);
        this.router.navigate([ '/login' ]);
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
