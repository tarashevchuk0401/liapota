import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { filter, map, tap } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  res = [];
  arrayOfItems = [];
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private serverService: ServerService,
  ) { }

  ngOnInit(): void {

    this.serverService.getUser().pipe(
      map(item => Object.values(item)),
      map(item => item[0]),
    ).subscribe(d => console.log(d));

    this.serverService.getFromCart().pipe(
      map(item => Object.values(item)),
      map(item => item[0]),
    ).subscribe(d => {
      console.log(d)

    });

    this.logInError()

  }


  logIn(userName: string, userPassword: string) {
    this.authService.SignIn(userName, userPassword)
  }

  logInError() {
    this.authService.errorCodeSubject.subscribe((d: any )=> {
      console.log(d)
      this.error = d
  })
  }



  goToSignUp() {
    this.router.navigate(['sign-up'])
  }

  submit(loginForm: NgForm) {
    console.log(loginForm.value)
  }


}
