import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isUserAuthenticated } from './core/guards/user-auth.guard';
import { AddBookComponent } from './pages/books/add-book/add-book.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'books',
        // component: BooksComponent,
        loadComponent: () => import('./pages/books/books.component').then(booksComponent => booksComponent.BooksComponent),
        canActivate: [isUserAuthenticated]
    },
    {
        path: 'addbook',
        // component: AddBookComponent,
        loadComponent: () => import('./pages/books/add-book/add-book.component').then(addBookComponent => addBookComponent.AddBookComponent),
        canActivate: [isUserAuthenticated],
    },
    {
        path: 'home',
        // component: HomeComponent,
        loadComponent: () => import('./pages/home/home.component').then(homeComponent => homeComponent.HomeComponent),
        canActivate: [isUserAuthenticated]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
