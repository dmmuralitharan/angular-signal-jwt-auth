import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Book } from '../models/book.model';
import { GetBookResponse } from '../models/book-response.model';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  http = inject(HttpClient)
  authService = inject(AuthService)
  
  async getAllBooks(): Promise<Book[]> {

    const user = this.authService.user()
    const jwtToken = user?.token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`)

    const book$ = this.http.get<GetBookResponse>(`${environment.apiRoot}/books`, { headers })

    const bookResponse = await firstValueFrom(book$)

    // console.log(bookResponse);
    
    return bookResponse.books

  }


  
}
