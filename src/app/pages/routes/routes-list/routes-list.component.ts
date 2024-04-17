import { Component } from '@angular/core';
import { RouteEn } from '../../../_models/routeEn';
import { RouteService } from '../../../_services/route.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.css'
})
export class RoutesListComponent {
 routeEns: RouteEn[] = [];
 constructor(private routeService: RouteService){}

 ngOnInit(): void {

 this.loadRoutesHome();
}

loadRoutesHome() {
  this.routeService.getRouteForHome().subscribe(rs=>{
    this.routeEns = rs;
  })
}
}
