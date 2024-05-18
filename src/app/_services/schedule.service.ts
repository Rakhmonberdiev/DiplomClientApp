import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Schedule } from "../_models/schedule";
import { map, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
    baseUrl = environment.apiUrl;
    scheduleCache = new Map();
    constructor(private http: HttpClient) { }
  
    getSchedulesForHome(){
      const response = this.scheduleCache.get(Object.values('').join('-'));
      if(response) return of(response);
      return this.http.get<Schedule[]>(this.baseUrl+'Schedule/GetAll').pipe(
        map(response=>{
          this.scheduleCache.set(Object.values('').join('-'), response);
          return response;
        })
      )
    }


    getScheduleById(id:string){
      return this.http.get<Schedule>(this.baseUrl+'Schedule?id='+id)
    }
  }