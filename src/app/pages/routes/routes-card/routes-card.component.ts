import { Component, Input } from '@angular/core';
import { RouteEn } from '../../../_models/routeEn';
import { formatDistanceToNow } from 'date-fns';
import {ru} from 'date-fns/locale/ru';
@Component({
  selector: 'app-routes-card',
  templateUrl: './routes-card.component.html',
  styleUrl: './routes-card.component.css'
})
export class RoutesCardComponent {
  @Input() routeEn: RouteEn | undefined;

  getElapsedTime(): string {
    if (this.routeEn && this.routeEn.created) {
      return formatDistanceToNow(this.routeEn.created, { locale: ru });
    }
    return '';
  }
}
