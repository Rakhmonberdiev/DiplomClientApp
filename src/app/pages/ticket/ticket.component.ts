import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Ticket } from '../../_models/ticket';
import { TicketService } from '../../_services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }]
})
export class TicketComponent implements OnInit {
tickets: Ticket[]=[];

constructor(private ticketServcie:TicketService){

}
  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(){
    this.ticketServcie.getAll().subscribe(rs=>{
      this.tickets = rs;
    })
  }

  convertToDate(dateString: string): Date {
    const dateParts = dateString.split('.');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const year = parseInt(dateParts[2]);
    return new Date(year, month, day);
  }
}
