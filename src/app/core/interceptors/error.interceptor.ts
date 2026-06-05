import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        if (error.error && error.error.message) {
          errorMessage += `\nDetails: ${error.error.message}`;
        }
      }
      
      // We log it here, but individual components can handle it too.
      console.error(errorMessage);
      
      // In a real app, you might want to show a toast/snackbar notification here
      
      return throwError(() => error);
    })
  );
};
