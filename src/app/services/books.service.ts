


import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksInterface } from '../interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Array<BooksInterface> = new Array<BooksInterface>();
  private _apiUrl: string = 'http://localhost:3000/books';

  constructor(@Inject(forwardRef(() => HttpClient)) private http: HttpClient) {}

  getAll():Observable<BooksInterface[]> {
    return this.http.get<BooksInterface[]>(this._apiUrl);
  }

  addbook(book: BooksInterface):Observable<BooksInterface> {
    
    return this.http.post<BooksInterface>(this._apiUrl, book);
  }
}
