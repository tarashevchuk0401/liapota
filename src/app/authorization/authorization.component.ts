import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {

  constructor(private authService: AuthService, private router: Router){}

  signIn(userName: string, userPassword:  string){
    this.authService.SignIn(userName, userPassword)
  }
  signUp(userName: string, userPassword:  string){
    this.authService.SignUp(userName, userPassword)
  }

  goToSignUp(){
    this.router.navigate(['sign-up'])
  }



}
