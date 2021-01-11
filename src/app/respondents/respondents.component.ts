import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RespondentsChartsService } from '../services/respondents/respondents-charts.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoadingService } from '../services/shared/loading.service';
import { ScrollTopService } from '../services/shared/scroll-to-top.service';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
  providers: [LoadingService],
})
export class RespondentsComponent implements OnInit, AfterViewInit {
  constructor(
    private chartServcie: RespondentsChartsService,
    public loadingService: LoadingService,
    //private scrollToTopService: ScrollTopService,
    public deviceDetectorService: DeviceDetectorService
  ) {}

  totalRespondents = this.chartServcie.TOTAL_RESPONDENTS();
  wordCloud = this.chartServcie.WORD_CLOUD();
  osVersions = this.chartServcie.OS_VERSIONS_CHART();
  devicesTypes = this.chartServcie.DEVICES_TYPES();
  map = this.chartServcie.MAP();

  ngOnInit(): void {
    //this.scrollToTopService.setScrollTop();
    this.loadingService.loadingOn();
    this.chartServcie.getGroupedRespondents();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 6000);
  }
}
