import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { GetBookResponse } from '../models/book-response.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  http = inject(HttpClient)
  
  async getAllBooks(): Promise<Book[]> {
    const book$ = this.http.get<GetBookResponse>(`${environment.apiRoot}/books`)

    const bookResponse = await firstValueFrom(book$)

    console.log(bookResponse);
    
    return bookResponse.books

  }
}
