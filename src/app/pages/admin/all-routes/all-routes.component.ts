import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouteEn } from '../../../_models/routeEn';
import { Pagination } from '../../../_models/pagination';
import { FadeIn } from '../animation';

@Component({
  selector: 'app-all-routes',
  templateUrl: './all-routes.component.html',
  styleUrl: './all-routes.component.css',
  animations: [FadeIn(300, true)]
})
export class AllRoutesComponent implements OnInit{
  search:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  routes: RouteEn[]=[];
  pagination!: Pagination
  pageNumber = 1;
  pageSize = 4;
  constructor(private adminService:AdminService){

  }
  ngOnInit(): void {
    this. getAllRoutes()
  }

  getAllRoutes(){
    this.adminService.GetallRT(this.pageNumber,this.pageSize,this.search).subscribe({
      next: response=> {
        if(response.result&&response.pagination){
          this.routes = response.result;
          this.pagination = response.pagination;
        }
      },
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getAllRoutes();
  }

  onReset(){
    this.search = this.searchTerm.nativeElement.value = '';
    this.getAllRoutes();
  }
  changePage(event:any){
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.getAllRoutes();
      }
    }
}
