import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-mongodb-chart',
  templateUrl: './mongodb-chart.component.html',
  styleUrls: ['./mongodb-chart.component.css'],
})
export class MongodbChartComponent implements OnInit {
  @Input() scr: string;

  constructor() {}

  ngOnInit(): void {}
}
