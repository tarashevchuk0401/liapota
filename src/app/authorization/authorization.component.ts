import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServerService } from '../services/server.service';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit{

  res = [];
  arrayOfItems = [];

  constructor(private authService: AuthService, private router: Router, private serverService: ServerService){}

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
    
    })

    
  }


  signIn(userName: string, userPassword:  string){
    this.authService.SignIn(userName, userPassword)
  }
 

  goToSignUp(){
    this.router.navigate(['sign-up'])
  }



}
