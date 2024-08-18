import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  authService = inject(AuthService)

  router = inject(Router)
  
  form = this.fb.group({
    username: [''],
    password: [''],
  });

  async register() {
    try {
      const { username, password } = this.form.value

      if( !username || !password ) {
        console.log(`Please, Enter Username and Password`);
        return
      }

      const user: Partial<User> = {
        username,
        password
      }

      await this.authService.register(user)

      await this.router.navigate(['/login'])
      
    } catch (error) {
      console.log(error);
    }
  }
}
