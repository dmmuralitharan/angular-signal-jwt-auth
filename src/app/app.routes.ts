import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BooksComponent } from './pages/books/books.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { isUserAuthenticated } from './core/guards/user-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'books',
        component: BooksComponent,
        canActivate: [isUserAuthenticated]
    },
    {
        path: 'home',
        component: HomeComponent,
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
