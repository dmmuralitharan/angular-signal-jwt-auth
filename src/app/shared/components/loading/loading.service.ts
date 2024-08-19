import { Injectable, signal } from '@angular/core';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  #loadingSignal = signal<boolean>(false)

  loading = this.#loadingSignal.asReadonly()

  loadingOn() {
    this.#loadingSignal.set(true)
  }

  loadingOff() {
    this.#loadingSignal.set(false)
  }
}
