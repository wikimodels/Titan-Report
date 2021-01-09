import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mongodb-chart',
  templateUrl: './mongodb-chart.component.html',
  styleUrls: ['./mongodb-chart.component.css'],
})
export class MongodbChartComponent implements OnInit {
  @Input() scr: string;
  @Input() width: number;
  @Input() height: number;

  constructor() {}

  ngOnInit(): void {}
}
