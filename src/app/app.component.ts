import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton, MatButtonModule} from "@angular/material/button";
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatSidenav,
    MatListItem,
    MatNavList,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-signal-jwt-auth';

  authService = inject(AuthService)

  isUserLoggedIn = this.authService.isUserLoggedIn

  logout() {
    this.authService.logout()
  }
}
