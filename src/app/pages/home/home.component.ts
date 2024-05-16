import { Component } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { District } from '../../_models/district';
import { Schedule } from '../../_models/schedule';
import { ScheduleService } from '../../_services/schedule.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

districts: District[]=[];
schedules: Schedule[]=[];
constructor(private districtService: DistrictService, private scheduleService: ScheduleService){}

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
}
