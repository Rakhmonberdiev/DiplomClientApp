import { Component } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { District } from '../../_models/district';
import { Schedule } from '../../_models/schedule';
import { ScheduleService } from '../../_services/schedule.service';
import { RouteEn } from '../../_models/routeEn';
import { RouteService } from '../../_services/route.service';
import { AccountService } from '../../_services/account.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

districts: District[]=[];
schedules: Schedule[]=[];
routeForTicked?: RouteEn; 
fromId:string='';
toId:string='';
fromIdSelected: boolean = false;
toIdSelected: boolean = false;

constructor(private districtService: DistrictService, 
  private scheduleService: ScheduleService,
  private routeService: RouteService,
  public accountService: AccountService){}

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
  if (this.fromIdSelected && this.toIdSelected){
    this.routeService.getRouteForTicket(this.fromId,this.toId).subscribe(rs=>{
      this.routeForTicked = rs;
    })
  }
}
}
