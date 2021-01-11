import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ChartDisplay } from 'src/models/chart-display';

@Injectable({
  providedIn: 'root',
})
export class Question1Service {
  constructor(private deviceDetector: DeviceDetectorService) {}

  GENDERS() {
    const chartId = '10578d98-04ac-4965-b27d-33868b9c36d3';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      500,
      400
    );
  }

  GENDERS_BY_CITIES() {
    const chartId = 'f7e50699-8118-411f-8424-205c9d99c4d3';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      500,
      400
    );
  }

  private getChartObj(chartId: string, widthXs, heightXs, widthLg, heightLg) {
    let obj: ChartDisplay = { chart_id: chartId };
    obj.width = this.deviceDetector.isMobile() === true ? widthXs : widthLg;
    obj.height = this.deviceDetector.isMobile() === true ? heightXs : heightLg;
    return obj;
  }
}
