import { Component } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { BooksInterface } from '../interfaces/books.interface';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { OrderService } from '../services/order.service.ts.service'; // Import your order service
import { Order } from '../interfaces/order';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  orderForm: FormGroup | any;
  cartItems: BooksInterface[] = [];
  total: number = 0;

  // Customer information properties
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';
  cin: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private orderService: OrderService
  ) {
    this.initForm();
    this.updateCart();
  }
  initForm() {
    this.orderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cin: ['', Validators.required]
    });
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.updateCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.updateCart();
  }

  increaseQuantity(index: number): void {
    this.cartService.increaseQuantity(index);
    this.updateCart();
  }

  decreaseQuantity(index: number): void {
    this.cartService.decreaseQuantity(index);
    this.updateCart();
  }

  confirmOrder(): void {
    if (this.orderForm.valid && this.authService.isLoggedIn) {
      const orderInfo: Order = {
        firstName: this.orderForm.get('firstName').value,
        lastName: this.orderForm.get('lastName').value,
        address: this.orderForm.get('address').value,
        phoneNumber: this.orderForm.get('phoneNumber').value,
        cin: this.orderForm.get('cin').value,
        books: this.cartItems.map(item => ({ title: item.title, quantity: item.quantity })),
        total: this.total,
        delivered: false
      };

      this.orderService.placeOrder(orderInfo).subscribe(
        response => {
          alert('Order placed successfully');
          console.log('Order placed successfully', response);
          this.clearCart();
          this.orderForm.reset();
          // You can also handle success, redirect, or any other actions here
        },
        error => {
          console.error('Error placing order', error);
          // Handle errors here
        }
      );}
      else{
        this.router.navigate(['/login']);
      }

      }
}
