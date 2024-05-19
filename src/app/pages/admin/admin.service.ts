import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RouteEn } from "../../_models/routeEn";
import { District } from "../../_models/district";



@Injectable({
    providedIn: 'root'
  })


export class AdminService{
    baseUrl = environment.apiUrl

    constructor(private http:HttpClient){

    }

    getAllRoutes(search:string){
        return this.http.get<RouteEn[]>(this.baseUrl+'routes/GetAll?search='+search);
    }
    getAllDists(search:string){
        return this.http.get<District[]>(this.baseUrl+'rayon/GetAll?search='+search);
    }
}