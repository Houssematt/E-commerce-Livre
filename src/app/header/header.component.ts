// header.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service'; // Replace with the correct path

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
 
 
})
export class HeaderComponent implements OnInit {
  username: string | null | undefined;
  isAdmin:boolean =false;
  
  constructor(private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.isLoggedIn = this.authService.isLoggedIn;
    this.isAdmin=this.authService.isAdminUser();

  }

  isLoggedIn: boolean = this.authService.isLoggedIn;
  

  getUsername(): string | null {
    return this.authService.clientName;
  }


  login(): void {
    localStorage.getItem("user");
    this.authService.isLoggedIn = true;
    console.log(this.isLoggedIn);
    this.username = this.authService.getUsername();
    this.isAdmin=this.authService.isAdminUser();

  }

  signup(): void {
    // Handle signup logic

  }

  logout(): void {
    this.authService.logout();
  }

 isadminuser()
  {
    return this.authService.isAdminUser();
  }

  
  
}
