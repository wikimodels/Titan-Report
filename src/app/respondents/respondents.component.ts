import { Component, OnInit } from '@angular/core';
import { RespondentsCharts } from './../../../consts/chartDisplays/respondents-charts';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
})
export class RespondentsComponent implements OnInit {
  constructor(private deviceService: DeviceDetectorService) {}
  chart = new RespondentsCharts(this.deviceService);
  osVersions = this.chart.OS_VERSIONS_CHART();
  devicesTypes = this.chart.DEVICES_TYPES();
  map = this.chart.MAP();

  ngOnInit(): void {}
}
