// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  // Get all users
  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  // Get a user by ID
  getUserById(userId: number): Observable<Users> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Users>(url);
  }

  // Create a new user
  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  // Update a user
  updateUser(user: Users): Observable<Users> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<Users>(url, user);
  }

  // Delete a user
  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<void>(url);
  }
}
