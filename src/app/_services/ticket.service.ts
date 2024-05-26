import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../_models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketData: any = null;
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  setTicketData(data: any) {
    this.ticketData = data;
  }

  getTicketData() {
    return this.ticketData;
  }

  postTicket(model:any){
    return this.http.post<any>(this.baseUrl+'Ticket',model)
  }
  getById(id:string){
    return this.http.get<Ticket>(this.baseUrl+'Ticket/'+id)

  }
}