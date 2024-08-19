import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, finalize, firstValueFrom, throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
//   const authService = inject(AuthService)
//   let jwtToken: string | null = ''

// //   jwtToken = authService.getToken()

//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${jwtToken}`
//     }
//   })
//   return next(authReq).pipe(
//     catchError((err: any) => {
//       console.log(err);
      
//       return throwError(() => err); 
//     })

//   )
// };

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => { 

    const authService = inject(AuthService)

    if(!authService.user()) {
        return next(req)
    }
    
    const jwtToken = authService.user()?.token

    const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
    })

    return next(authReq).pipe(
        catchError((err: any) => {
          console.log(err);
          
          return throwError(() => err); 
        })
    )




}
