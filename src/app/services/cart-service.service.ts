import { Injectable } from '@angular/core';
import { BooksInterface } from '../interfaces/books.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private readonly storageKey = 'shopping_cart';
  private apiUrl = 'http://localhost:3000/livraison';

  constructor(private http: HttpClient) {  this.loadCartData(); }

    cartItems: BooksInterface[] = [];
  
    addToCart(book: BooksInterface): void {
      const existingItem = this.cartItems.find(i => i.title === book.title);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        
     

      
      this.cartItems.push(book);
      book.quantity=1;
      console.log(`Added ${book.title} to the cart:`, this.cartItems);
      this.saveCartData();
    }
    }
  
    removeFromCart(index: number): void {
      this.cartItems.splice(index, 1);
      this.saveCartData();
    }
  
    getCartItems(): BooksInterface[] {
      return this.cartItems;
      
    }
  
    clearCart(): void {
      this.cartItems = [];
      this.saveCartData();
    }

    
  
    getTotal(): number {
      // Implement your logic to calculate the total (e.g., sum of book prices)
      
      return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    }
    increaseQuantity(index: number): void {
      this.cartItems[index].quantity++;
    
    }
    decreaseQuantity(index: number): void {
      const item = this.cartItems[index];
      if (item.quantity > 1) {
        item.quantity--;
      }
     
    }

    placeOrder(orderData: any): Observable<any> {
      // Send a POST request to your backend API to store the order
      return this.http.post<any>(`${this.apiUrl}/orders`, orderData);
    }




    private loadCartData(): void {
      const storedCartData = localStorage.getItem(this.storageKey);
  
      if (storedCartData) {
        this.cartItems = JSON.parse(storedCartData);
      }
    }
  
    // Save cart data to localStorage
    private saveCartData(): void {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));

    }
  }

