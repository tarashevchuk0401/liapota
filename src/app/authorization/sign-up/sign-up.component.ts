import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  error: string = '';

  constructor(
    private authService: AuthService,
    private serverService: ServerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpError()
  }

  submit(signUpForm: NgForm) {
    this.authService.SignUp(signUpForm.value.email, signUpForm.value.password);
    this.serverService.setNewUser(signUpForm.value.email, signUpForm.value.password, +signUpForm.value.phone, signUpForm.value.name).subscribe()

  }

  signUpError() {
    this.authService.errorCodeSubject.subscribe((d: any )=> {
      console.log(d)
      this.error = d
  })
  }


}
