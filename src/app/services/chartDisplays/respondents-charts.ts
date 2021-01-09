import { DeviceDetectorService } from 'ngx-device-detector';
import { ChartDisplay } from './../../../models/chart-display';

export class RespondentsCharts {
  constructor(private deviceDetector: DeviceDetectorService) {}

  DEVICES_TYPES() {
    const chartId = '58d7f552-95e0-4131-9804-7f3646f95508';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      560,
      400
    );
  }
  OS_VERSIONS_CHART() {
    const chartId = '91055dae-6c9f-4a4d-b2f4-d86b1e67fc8a';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      560,
      400
    );
  }

  MAP() {
    const chartId = '014963e6-a416-4d5c-a045-70eeee471be5';
    return this.getChartObj(chartId, window.innerWidth, 500, 1260, 400);
  }

  private getChartObj(chartId: string, widthXs, heightXs, widthLg, heightLg) {
    let obj: ChartDisplay = { chart_id: chartId };
    obj.width = this.deviceDetector.isMobile() === true ? widthXs : widthLg;
    obj.height = this.deviceDetector.isMobile() === true ? heightXs : heightLg;
    return obj;
  }
}
