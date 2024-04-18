import { Component } from '@angular/core';
import { DistrictService } from '../../_services/district.service';
import { District } from '../../_models/district';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  districts: District[]=[];
constructor(private districtService: DistrictService){}

ngOnInit() {
  this.loadDistricts();
}

loadDistricts(){
  this.districtService.getDistrict().subscribe(rs=>{
    this.districts = rs;
  })
}
}
