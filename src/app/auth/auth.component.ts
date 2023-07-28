import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  password: string = '';

  constructor(private router : Router){}

  submit(password: string){
      if(password === '1234'){
        this.router.navigate(['admin']);
        sessionStorage.setItem('isAdmin', 'true');
      }
  }

}
