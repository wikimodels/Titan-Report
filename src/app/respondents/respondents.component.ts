import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RespondentsChartsService } from '../services/chart-displays/respondents-charts.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
})
export class RespondentsComponent implements OnInit, AfterViewInit {
  constructor(
    private chartServcie: RespondentsChartsService,
    public loadingService: LoadingService
  ) {}

  osVersions = this.chartServcie.OS_VERSIONS_CHART();
  devicesTypes = this.chartServcie.DEVICES_TYPES();
  map = this.chartServcie.MAP();

  ngOnInit(): void {
    this.chartServcie.getGroupedRespondents();
    this.loadingService.loadingOn();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 6000);
  }
}
