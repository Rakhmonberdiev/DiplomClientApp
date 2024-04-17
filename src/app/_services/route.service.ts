import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, of } from 'rxjs';
import { RouteEn } from '../_models/routeEn';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  baseUrl = environment.apiUrl;
  routeCache = new Map();
  constructor(private http: HttpClient) { }

  getRouteForHome(){
    const response = this.routeCache.get(Object.values('').join('-'));
    if(response) return of(response);
    return this.http.get<RouteEn[]>(this.baseUrl+'routes/GetAllForHome').pipe(
      map(response=>{
        this.routeCache.set(Object.values('').join('-'), response);
        return response;
      })
    )
  }
}
