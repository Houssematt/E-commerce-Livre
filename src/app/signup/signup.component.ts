import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _route: Router, private _http: HttpClient) { }
  singup: FormGroup | any;
  signuser: any;

  ngOnInit(): void {
    this.singup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.containsUppercase,
        this.containsLowercase,
        this.startsWithUppercase
      ]),
      
      'image': new FormControl(),
      'role': new FormControl('user', Validators.required), 
    });
  }

  singupdata(singup: FormGroup) {
    if (this.singup.valid) {
      console.log(this.singup.value);
      this.signuser = this.singup.value.name;
      this._http.post<any>("http://localhost:3000/users", this.singup.value)
        .subscribe(res => {
          alert('data added successfully');
          this.singup.reset();
          this._route.navigate(['login']);
        }, err => {
          alert('Something went wrong');
        });
    } else {
      // Form is not valid, handle accordingly (optional)
      alert('Form is not valid. Please check your inputs.');
    }
      
  }

  containsUppercase(control: FormControl): { [key: string]: boolean } | null {
    if (!/[A-Z]/.test(control.value)) {
      return { 'uppercaseRequired': true };
    }
    return null;
  }

  containsLowercase(control: FormControl): { [key: string]: boolean } | null {
    if (!/[a-z]/.test(control.value)) {
      return { 'lowercaseRequired': true };
    }
    return null;
  }
  startsWithUppercase(control: FormControl): { [key: string]: boolean } | null {
    if (!/^[A-Z]/.test(control.value)) {
      return { 'startsWithUppercase': true };
    }
    return null;
  }

  sbtn() {
    this._route.navigate(['login']);
    $('.form-box1').css('z-index', '99');
    $('.form-box').css('display', 'block');
    $('.form-box1').css('display', 'none');
  }
}
