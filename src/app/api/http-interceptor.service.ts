import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { delay, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
    simulatingDelay:number = 1000;

    constructor(private spinnerService: SpinnerService) { }

    /** Identifies and handles a given HTTP request. */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.spinnerService.show();

        return next
            .handle(req)
            .pipe(
                delay(this.simulatingDelay),
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.hide();
                    }
                }, (error: any) => {
                    console.error(error);
                    this.spinnerService.hide();
                })
            );
    }
}
