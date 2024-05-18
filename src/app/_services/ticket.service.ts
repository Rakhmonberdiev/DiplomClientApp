import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketData: any = null;

  constructor() { }

  setTicketData(data: any) {
    this.ticketData = data;
  }

  getTicketData() {
    return this.ticketData;
  }
}