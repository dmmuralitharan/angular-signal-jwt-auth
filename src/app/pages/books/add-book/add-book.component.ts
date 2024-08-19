import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../../../core/services/books.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    bookname: [''],
    price: [''],
  });

  bookService = inject(BooksService);
  router = inject(Router);

  async createBook() {
    try {
      const { bookname, price } = this.form.value;

      if (!bookname || !price) {
        console.log(`Please, Enter Book Name and Price`);
        return;
      }

      const book = {
        book_name: bookname, 
        price: Number(price)
      }

      await this.bookService.createBook(book)

      await this.router.navigate(['books'])
    } catch (error) {
      console.log(error);
    }
  }
}
