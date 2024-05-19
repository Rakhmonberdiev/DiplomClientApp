import { Component, OnInit } from '@angular/core';
import { Schedule } from '../../../_models/schedule';
import { FadeIn } from '../animation';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-all-schedules',
  templateUrl: './all-schedules.component.html',
  styleUrl: './all-schedules.component.css',
  animations: [FadeIn(300, true)]
})
export class AllSchedulesComponent implements OnInit{
  schedules: Schedule[]=[];
constructor(private adminService: AdminService){

}
ngOnInit(): void {
  this.loadSchedules();
}


loadSchedules(){
  this.adminService.GetAllSCH().subscribe(rs=>{
    this.schedules = rs;
  })
}
}
