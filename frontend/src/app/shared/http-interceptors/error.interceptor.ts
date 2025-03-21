import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('API Error:', error);

      let errorMessage = 'An unknown error occurred.';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server error (${error.status}): ${error.message}`;
      }

      alert(errorMessage); // ✅ Replace with a proper UI notification in a real app

      return throwError(() => new Error(errorMessage));
    })
  );
};
