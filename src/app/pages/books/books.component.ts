import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../core/models/book.model';
import { BooksService } from '../../core/services/books.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatCardModule, DatePipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  constructor() {
   
    this.getAllBooks().then(() => {
      console.log(`All Books Are Loaded ... `, this.#books());
    })

  }

  booksService = inject(BooksService)

  #books = signal<Book[]>([])

  books = this.#books.asReadonly()


  async getAllBooks() {
    try {
      const books = await this.booksService.getAllBooks()
      this.#books.set(books)      
    } catch (error) {
      console.log(error);
    }
  }


}
