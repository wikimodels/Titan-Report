import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  throwError,
  of,
  from,
  combineLatest,
} from 'rxjs';
import {
  catchError,
  map,
  tap,
  finalize,
  switchMap,
  shareReplay,
} from 'rxjs/operators';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { UserInfo } from 'src/models/user/user-info.model';
import { DeviceDetectorService } from 'ngx-device-detector';

import {
  IPIFY_IP,
  GET_USER_INFO_BY_IP,
  GET_ALL_ANSWERED_USERS,
  GET_ALL_USERS_GROUPED_BY_LOCATION,
  SAVE_VISITATION_STATS,
} from 'consts/urls.consts';
import {
  VisitationPageType,
  VisitationStats,
} from 'src/models/user/visitation-stats';
import { UserInfoService } from './user-info.service';

const formatDisplayDate = 'DD-MM-YY';
const formatDisplayTime = 'HH:mm';
declare global {
  interface Window {
    ActiveXObject: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class VisitationStatsService {
  constructor(
    private readonly http: HttpClient,
    private userInfoService: UserInfoService
  ) {}

  saveVisitationStats(visitationStats: VisitationStats) {
    visitationStats.userInfo = this.userInfoService.getUserInfoSubj();
    visitationStats.leave_date = Date.now();
    visitationStats.stay_duraion = this.calculateStayDuration(visitationStats);
    this.postVisitationStats(visitationStats);
  }

  private postVisitationStats(data: VisitationStats) {
    this.http
      .post<VisitationStats>(SAVE_VISITATION_STATS(), data)
      .pipe(
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe(console.log);
  }

  setVisitationStats(
    questionId: number,
    pageType: VisitationPageType
  ): VisitationStats {
    let pageName =
      questionId === 0 ? pageType : pageType + questionId.toString();

    const visitationStats: VisitationStats = {
      enter_date: Date.now(),
      page_name: pageName,
    };

    return visitationStats;
  }

  private calculateStayDuration(visitationDetails: VisitationStats) {
    const start = moment(visitationDetails.enter_date);
    const end = moment(visitationDetails.leave_date);
    return moment.duration(end.diff(start)).asMilliseconds();
  }
}
