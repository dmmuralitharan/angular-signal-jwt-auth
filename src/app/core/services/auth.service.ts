import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    this.loadUserFromLocalStorage()
    
    effect(() => {
      const user = this.user()

      if(user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      }
    })
  }

  loadUserFromLocalStorage() {
    const userPayload = localStorage.getItem(USER_STORAGE_KEY)

    if(userPayload) {
      this.#userSignal.set(JSON.parse(userPayload))
    }
  }

  http = inject(HttpClient)

  router = inject(Router)

  async register(user: Partial<User>): Promise<User> {
    const newUser$ = this.http.post<User>(`${environment.apiRoot}/auth/register`, user)
    return await firstValueFrom(newUser$)
  }

  #userSignal = signal<User | null>(null)

  user = this.#userSignal.asReadonly()

  isUserLoggedIn = computed(() => !!this.user())

  isAdmin = computed(() => this.user()?.role === 'admin')
  isUser = computed(() => this.user()?.role === 'user')

  async login(username: string, password: string): Promise<User> {

    const user$ = this.http.post<User>(`${environment.apiRoot}/auth/login`, {username, password})

    const user = await firstValueFrom(user$)

    this.#userSignal.set(user)

    return user
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY)
    this.#userSignal.set(null)
    await this.router.navigate(['login'])
  }

}
