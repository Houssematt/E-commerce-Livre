import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service.ts.service';
import { Order } from '../interfaces/order';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      console.log(orders)
    });
  }
  toggleDeliveryStatus(order: Order): void {
    order.delivered = !order.delivered;}
  
    
}
