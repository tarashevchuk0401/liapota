import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private authService: AuthService){}

  submit(userName: string, userPassword:  string){
    this.authService.SignUp(userName, userPassword)
  }

}
