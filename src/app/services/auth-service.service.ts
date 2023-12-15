// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isLoggedIn: boolean = false;
  clientName: string | null = null;
  role: string | null = null;
  private isAdmin: boolean = false;
  private readonly userKey = 'user';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _fb: FormBuilder

  ) {
    this.loadUserFromLocalStorage();
  }

  login(loginForm: FormGroup): Observable<boolean> {
    return this._http.get<any>("http://localhost:3000/users")
      .pipe(
        map((res: any[]) => {
          const user = res.find((a: any) => a.email === loginForm.value.email && a.password === loginForm.value.password);

          if (user) {
            
            localStorage.setItem(this.userKey, JSON.stringify(user));
            this.isLoggedIn = true;
            this.clientName = user.name;
            this.role = user.role;

            loginForm.reset();
            console.log(user);
            this._router.navigate(['home']);
            return true;
          } else {
            alert('User Not Found');
            return false;
          }
        }),
        catchError((err) => {
          console.error('Something went wrong', err);
          alert('Something went wrong');
          return of(false);
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.clientName = null;
    this.role = null;
    this.isAdmin = false;

    localStorage.removeItem(this.userKey);
    // additional logout logic if needed
    this._router.navigate(['login']);
  }
  getUsername(): string | null {
    return this.clientName;
  }
  isAdminUser(): boolean {
    if (this.role === 'admin') {
      this.isAdmin = true;
    }
    return this.isAdmin;
  }
  loadUserFromLocalStorage(): void {
    // Retrieve user information from localStorage
    const userString = localStorage.getItem(this.userKey);
    const user = userString ? JSON.parse(userString) : null;

    // Set isLoggedIn and clientName based on localStorage
    if (user) {
      this.isLoggedIn = true;
      this.clientName = user.name;
      this.role = user.role;
    }
  }

}
