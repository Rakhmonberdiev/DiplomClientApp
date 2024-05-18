import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouteEn } from '../../../_models/routeEn';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrl: './all-routes.component.css'
})
export class AllRoutesComponent implements OnInit{
  search:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  routes: RouteEn[]=[];
  constructor(private adminService:AdminService){

  }
  ngOnInit(): void {
    this. getAllRoutes()
  }

  getAllRoutes(){
    this.search = this.searchTerm.nativeElement.value;
    this.adminService.getAllRoutes(this.search).subscribe(rs=>{
      this.routes = rs
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getAllRoutes();
  }

  onReset(){
    this.searchTerm.nativeElement.value = '';
    this.getAllRoutes();
  }
}
