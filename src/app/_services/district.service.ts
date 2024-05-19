import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { District } from "../_models/district";
import { environment } from "../../environments/environment";
import { map, of } from "rxjs";



@Injectable({
    providedIn: 'root'
  })

export class DistrictService{
baseUrl = environment.apiUrl;
routeCache = new Map();
constructor(private http: HttpClient){}

getDistrict(){
  const response = this.routeCache.get(Object.values('').join('-'));
  if(response) return of(response);
    return this.http.get<District[]>(this.baseUrl+'rayon/GetAllForHome').pipe(
      map(response=>{
        this.routeCache.set(Object.values('').join('-'), response);
        return response;
      })
    )
}
}