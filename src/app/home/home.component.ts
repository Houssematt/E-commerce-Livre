
import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { BooksService } from '../services/books.service';
import { BooksInterface } from '../interfaces/books.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', // Fix the template URL
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
  books: Array<BooksInterface> = [];

  constructor(private booksService: BooksService) {}
  ngOnInit(): void {
    this.getBooksData();
  }

  getBooksData(): void {
    this.booksService.getAll().subscribe(data => {
      // Initialize the showFullDescription property for each book
      this.books = data.map(book => ({ ...book, showFullDescription: false }));
    });
  }
}
