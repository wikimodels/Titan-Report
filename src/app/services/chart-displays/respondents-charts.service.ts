import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_ALL_USERS_GROUPED_BY_LOCATION } from 'consts/urls.consts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChartDisplay } from 'src/models/chart-display';
import {
  GroupedRespondent,
  GroupedRespondentsApi,
} from 'src/models/grouped-respondent';
import * as defaults from '../../../assets/utils/defaults.json';
@Injectable({
  providedIn: 'root',
})
export class RespondentsChartsService {
  constructor(
    private http: HttpClient,
    private deviceDetector: DeviceDetectorService
  ) {}

  private _groupedRespondentsApiSubj = new BehaviorSubject<GroupedRespondentsApi>(
    defaults.groupedRespondentsApi
  );

  groupedRespondentsApiSubj$ = this._groupedRespondentsApiSubj.asObservable();

  getGroupedRespondentsApiSubj() {
    return this._groupedRespondentsApiSubj.getValue();
  }
  setGroupedRespondentsApiSubj(value) {
    this._groupedRespondentsApiSubj.next(value);
  }

  DEVICES_TYPES() {
    const chartId = '58d7f552-95e0-4131-9804-7f3646f95508';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      500,
      400
    );
  }
  OS_VERSIONS_CHART() {
    const chartId = '91055dae-6c9f-4a4d-b2f4-d86b1e67fc8a';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      window.innerWidth,
      500,
      400
    );
  }

  MAP() {
    const chartId = '014963e6-a416-4d5c-a045-70eeee471be5';
    return this.getChartObj(
      chartId,
      window.innerWidth,
      500,
      0.8 * window.innerWidth,
      700
    );
  }

  getGroupedRespondents() {
    this.http
      .get<GroupedRespondent[]>(GET_ALL_USERS_GROUPED_BY_LOCATION())
      .pipe(
        catchError((error) => {
          console.log(error);
          return [];
        })
      )
      .subscribe((value: GroupedRespondent[]) => {
        console.log('Groupped resp', value);
        const obj: GroupedRespondentsApi = {
          groupedRespondents: value,
          groupedRespondentsCount: value.length,
        };
        this.setGroupedRespondentsApiSubj(obj);
      });
  }

  private getChartObj(chartId: string, widthXs, heightXs, widthLg, heightLg) {
    let obj: ChartDisplay = { chart_id: chartId };
    obj.width = this.deviceDetector.isMobile() === true ? widthXs : widthLg;
    obj.height = this.deviceDetector.isMobile() === true ? heightXs : heightLg;
    return obj;
  }
}
