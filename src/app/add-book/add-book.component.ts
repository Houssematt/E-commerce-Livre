// add-book.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { BooksInterface } from '../interfaces/books.interface';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
  bookForm: FormGroup | any;

  constructor(private fb: FormBuilder, private bookService: BooksService) {
    this.bookForm = this.fb.group({
      title: [''],
      rating: [0],
      authors: [''],
      price: [0],
      quantity: [0],
      description: [''],
      imageUrl: [''],
      showFullDescription: [false],
    });
  }

  addBook(): void {
    const newBook: BooksInterface = {
      ...this.bookForm.value,
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
    };
  
    this.bookService.addbook(newBook).subscribe(
      (response) => {
        console.log('Book added successfully!', response);
        this.bookForm.reset();
      },
      (error) => {
        console.error('Error adding book:', error);
      }
    );
  }
}
