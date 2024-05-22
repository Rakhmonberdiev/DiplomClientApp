import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RouteEn } from "../../_models/routeEn";
import { District } from "../../_models/district";
import { PaginatedResult } from "../../_models/pagination";
import { Subject, map } from "rxjs";
import { Schedule } from "../../_models/schedule";



@Injectable({
    providedIn: 'root'
  })


export class AdminService{
    baseUrl = environment.apiUrl
    paginatedResult: PaginatedResult<District[]> = new PaginatedResult<District[]>;
    paginatedResultRT: PaginatedResult<RouteEn[]> = new PaginatedResult<RouteEn[]>; 


   
    constructor(private http:HttpClient){

    }


  

    getAllDist(pageNumber:number, itemsPerPage:number, search?:string){
        let params = new HttpParams();
        if(pageNumber&&itemsPerPage){
            params = params.append('pageNumber',pageNumber);
            params = params.append('pageSize', itemsPerPage);
        }
        if(search){
            params = params.append('search',search)
        }

        return this.http.get<District[]>(this.baseUrl+'rayon/GetAll',{observe:'response',params}).pipe(
            map(response=>{
                if(response.body){
                    this.paginatedResult.result = response.body;
                }
                const pagination = response.headers.get('Pagination');
                if(pagination){
                    this.paginatedResult.pagination = JSON.parse(pagination);
                }
                return this.paginatedResult;
            })
        )
    }

    GetallRT(pageNumber:number, itemsPerPage:number, search?:string){
        let params = new HttpParams();
        if(pageNumber&&itemsPerPage){
            params = params.append('pageNumber',pageNumber);
            params = params.append('pageSize', itemsPerPage);
        }
        if(search){
            params = params.append('search',search)
        }
        return this.http.get<RouteEn[]>(this.baseUrl+'routes/GetAll',{observe:'response',params}).pipe(
            map(response=>{
                if(response.body){
                    this.paginatedResultRT.result = response.body;
                }
                const pagination = response.headers.get('Pagination');
                if(pagination){
                    this.paginatedResultRT.pagination = JSON.parse(pagination);
                }
                return this.paginatedResultRT;
            })
        )
    }
    GetAllSCH(){
        return this.http.get<Schedule[]>(this.baseUrl+'Schedule/GetAll')
    }

    getByIdDist(id:string){
        return this.http.get<District>(this.baseUrl+'rayon/'+id);
    }

    updateDist(id:string,title:string){
        const urlUpdate = this.baseUrl+'rayon/'+id
        const data = {title:title};
        return this.http.put(urlUpdate,data)
    }

}