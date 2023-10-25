import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpEventType } from '@angular/common/http';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();

    let clonedRequest;

    if (request.method === 'POST' || request.method === 'PUT') {
      clonedRequest = request.clone({
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      });
    } else {
      clonedRequest = request;
    }

    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<unknown>) => event.type === HttpEventType.Response),
      tap(() => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        console.log(`${request.method} request to the ${request.urlWithParams} URL took ${elapsedTime} milliseconds.`);
      }),
    );
  }
}
