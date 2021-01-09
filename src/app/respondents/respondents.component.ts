import { Component, OnInit } from '@angular/core';
import { RespondentsChartsService } from '../services/chart-displays/respondents-charts.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
})
export class RespondentsComponent implements OnInit {
  constructor(private chartServcie: RespondentsChartsService) {}

  osVersions = this.chartServcie.OS_VERSIONS_CHART();
  devicesTypes = this.chartServcie.DEVICES_TYPES();
  map = this.chartServcie.MAP();

  ngOnInit(): void {
    this.chartServcie.getGroupedRespondents();
  }
}
