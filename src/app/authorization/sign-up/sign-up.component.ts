import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private authService: AuthService, private serverService: ServerService){}

  submit(signUpForm: NgForm){
    console.log(signUpForm.value);
    this.authService.SignUp(signUpForm.value.email, signUpForm.value.password);
    this.serverService.setNewUser(signUpForm.value.email, signUpForm.value.password).subscribe()

  }

  signUp(userName: string, userPassword:  string){
  }

  show(){
    console.log
  }
}
