import { Component } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { District } from '../../_models/district';
import { Schedule } from '../../_models/schedule';
import { ScheduleService } from '../../_services/schedule.service';
import { RouteEn } from '../../_models/routeEn';
import { RouteService } from '../../_services/route.service';
import { AccountService } from '../../_services/account.service';
import { Router } from '@angular/router';
import { TicketService } from '../../_services/ticket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

districts: District[]=[];
schedules: Schedule[]=[];
routeForTicket!: any; 
fromId!:string;
toId!:string;
fromIdSelected: boolean = false;
toIdSelected: boolean = false;
scheduleIdSelected: boolean = false;
districtsLoading = false;
scheduleId! : any;
scheduleModel! : any;
constructor(private districtService: DistrictService, 
  private scheduleService: ScheduleService,
  private routeService: RouteService,
  public accountService: AccountService, private router:Router,private ticketService: TicketService){}

ngOnInit() {
  this.loadDistricts();
  this.loadSchedule();
}

loadDistricts(){
  this.districtService.getDistrict().subscribe(rs=>{
    this.districts = rs;
  })
}

loadSchedule(){
  this.scheduleService.getSchedulesForHome().subscribe(rs=>{
    this.schedules = rs;
  })
}
loadRoutForTicked(){
  if (this.fromIdSelected && this.toIdSelected&& this.scheduleIdSelected){
    this.routeService.getRouteForTicket(this.fromId,this.toId).subscribe(rs=>{
      this.routeForTicket = rs;
    })
  }
}

goToTicketConfirm(){
  if (this.routeForTicket) {
    const ticketData ={
      id: this.routeForTicket.id,
      price: this.routeForTicket.price,
      starPoint: this.routeForTicket.starPoint,
      endPoint: this.routeForTicket.endPoint,
      scheduleId: this.scheduleId,
    };
    this.ticketService.setTicketData(ticketData);
    this.router.navigate(['/ticket-confirm']);
  } 
}
}
