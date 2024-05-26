import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../_models/ticket';
import { TicketService } from '../../_services/ticket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent implements OnInit {

ticket: Ticket = {} as Ticket;
constructor(private ticketService:TicketService,private route: ActivatedRoute){

}
ngOnInit(): void {
  this.loadTicket();
}

loadTicket(){
  const id = this.route.snapshot.params['id'];
  this.ticketService.getById(id).subscribe((ticket)=>{
    this.ticket=ticket;
  })
}
}
