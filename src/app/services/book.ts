import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environments';

export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publishYear: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverImage?: string;
}

export interface BookResponse {
  success: boolean;
  books?: Book[];
  book?: Book;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${API_URL}/books`;
  
  books = signal<Book[]>([]);

  constructor(private http: HttpClient) {}

  getBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>(this.apiUrl);
  }

  getBookById(id: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${this.apiUrl}/${id}`);
  }

  createBook(book: Book): Observable<BookResponse> {
    return this.http.post<BookResponse>(this.apiUrl, book);
  }

  updateBook(id: string, book: Book): Observable<BookResponse> {
    return this.http.put<BookResponse>(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: string): Observable<BookResponse> {
    return this.http.delete<BookResponse>(`${this.apiUrl}/${id}`);
  }
}
