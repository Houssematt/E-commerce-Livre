import { Component } from '@angular/core';
import { BooksInterface } from '../interfaces/books.interface';
import { BooksService } from '../services/books.service';
import {  OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartServiceService } from '../services/cart-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '60px' })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('300ms ease-out'))
    ])
  ]
})
export class BooksComponent  {
  expandedIndex: number = -1;
  books: Array<BooksInterface> = [];

  constructor(private booksService: BooksService,
    private cartService: CartServiceService
    ) {}

  ngOnInit(): void {
    this.getBooksData();
  }

  getBooksData(): void {
    this.booksService.getAll().subscribe(data => {
      // Initialize the showFullDescription property for each book
      this.books = data.map(book => ({ ...book, showFullDescription: false }));
    });
  }

  toggleDescription(index: number): void {
    this.expandedIndex = (this.expandedIndex === index) ? -1 : index;
  }
  addToCart(book: BooksInterface): void {
    
    this.cartService.addToCart(book);
    
}

}