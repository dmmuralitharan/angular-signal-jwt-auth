import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    username: [''],
    password: [''],
  });

  authService = inject(AuthService);
  router = inject(Router);
  async login() {
    try {
      const { username, password } = this.form.value;

      if (!username || !password) {
        console.log(`Please, Enter Username and Password`);
        return;
      }

      await this.authService.login(username, password);

      if (this.authService.isUser()) {
        await this.router.navigate(['books']);
      } else if (this.authService.isAdmin()) {
        await this.router.navigate(['home']);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}
