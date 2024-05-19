import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { District } from '../../../_models/district';

import { Pagination } from '../../../_models/pagination';
import { FadeIn } from '../animation';


@Component({
  selector: 'app-all-districts',
  templateUrl: './all-districts.component.html',
  styleUrl: './all-districts.component.css',
  animations: [FadeIn(200, true)]

})
export class AllDistrictsComponent implements OnInit {
  search?:string ='';
  @ViewChild('search', {static:true}) searchTerm!: ElementRef;
  dists: District[]=[];
  pagination!: Pagination
  pageNumber = 1;
  pageSize = 4;
  constructor(private adminService:AdminService){

  }
  ngOnInit(): void {
    this.getDists();
  }

  getDists(){
    this.adminService.getAllDist(this.pageNumber,this.pageSize,this.search).subscribe({
      next: response=> {
        if(response.result&&response.pagination){
          this.dists = response.result;
          this.pagination = response.pagination;
        }
      },
    })
  }

  onSearch(){
    this.search = this.searchTerm.nativeElement.value;
    this.getDists();
  }

  onReset(){
    this.search = this.searchTerm.nativeElement.value = '';
    this.getDists();
  }
  changePage(event:any){
  if(this.pageNumber !== event.page){
    this.pageNumber = event.page;
    this.getDists();
    }
  }
}
