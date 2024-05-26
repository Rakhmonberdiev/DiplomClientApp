import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TicketService } from '../_services/ticket.service';
import { Ticket } from '../_models/ticket';

export const ticketDetailResolver: ResolveFn<Ticket> = (route, state) => {
  const ticketService = inject(TicketService);
  return ticketService.getById(String(route.paramMap.get('id')))
};
