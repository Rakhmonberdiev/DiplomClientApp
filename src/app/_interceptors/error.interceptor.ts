import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";



@Injectable()

export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modelStateErrors = [];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modelStateErrors.push(error.error.errors[key])
                  }
                }
                throw modelStateErrors.flat();
              }else{
                console.log(error.error)
              }
              break;
                case 404:
                  this.router.navigateByUrl('/not-found');
              break;
                default:
                  console.log(error);
                  break;

          }
        }
        throw error;
      })
    )
  }

}