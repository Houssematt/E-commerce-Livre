
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000'; // Assuming your JSON Server runs on localhost:3000

  constructor(private http: HttpClient) {}

  placeOrder(orderInfo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderInfo);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }
}