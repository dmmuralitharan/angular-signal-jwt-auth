import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton, MatButtonModule} from "@angular/material/button";
import { AuthService } from './core/services/auth.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

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
    RouterLink,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-signal-jwt-auth';

  authService = inject(AuthService)

  isAdmin = this.authService.isAdmin
  isUser = this.authService.isUser

  isUserLoggedIn = this.authService.isUserLoggedIn

  logout() {
    this.authService.logout()
  }
}
