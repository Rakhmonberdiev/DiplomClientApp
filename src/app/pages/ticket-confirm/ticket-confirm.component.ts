import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouteEn } from '../../_models/routeEn';
import { TicketService } from '../../_services/ticket.service';
import { Router } from '@angular/router';
import { ScheduleService } from '../../_services/schedule.service';
import { Schedule } from '../../_models/schedule';

@Component({
  selector: 'app-ticket-confirm',
  templateUrl: './ticket-confirm.component.html',
  styleUrl: './ticket-confirm.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }]
})
export class TicketConfirmComponent implements OnInit {
  ticketData: any;
  schedule!:string;

  constructor(private ticketService: TicketService, private router:Router, private scheduleService: ScheduleService) { }
  ngOnInit(): void {
    this.ticketData = this.ticketService.getTicketData();
  
    if (!this.ticketData) {
      this.router.navigateByUrl('/');
      return;
    }
    
    this.scheduleService.getScheduleById(this.ticketData.scheduleId).subscribe(rs => {
      this.schedule = rs.title;
      if (!this.schedule) {
        this.router.navigateByUrl('/');
      }
    });
  }

}
