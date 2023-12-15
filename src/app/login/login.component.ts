// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
sbtn1() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.loginForm).subscribe((success) => {
      if (success) {
      //  alert('You are successfully logged in');
      }
      
      
    });
  }

}
