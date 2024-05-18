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
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


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
bsDatePickerValue: Date = new Date();
bsConfig?: Partial<BsDatepickerConfig>;
dateSelected: boolean = false;
constructor(private districtService: DistrictService, 
  private scheduleService: ScheduleService,
  private routeService: RouteService,
  public accountService: AccountService, private router:Router,private ticketService: TicketService){
    this.bsConfig = {
      containerClass: 'theme-default',
      isAnimated : true,
      minDate: new Date()
    }
    
  }

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
  if (this.fromIdSelected && this.toIdSelected&& this.scheduleIdSelected&&this.dateSelected){
    this.routeService.getRouteForTicket(this.fromId,this.toId).subscribe(rs=>{
      this.routeForTicket = rs;
    })
  }
}

goToTicketConfirm(){
  if (this.routeForTicket) {
    const selectedDate = this.bsDatePickerValue;
    const isoDate = new Date(selectedDate).toISOString();
    const ticketData ={
      id: this.routeForTicket.id,
      price: this.routeForTicket.price,
      starPoint: this.routeForTicket.starPoint,
      endPoint: this.routeForTicket.endPoint,
      scheduleId: this.scheduleId,
      date: isoDate
    };
    this.ticketService.setTicketData(ticketData);
    this.router.navigate(['/ticket-confirm']);
  } 
}
}
