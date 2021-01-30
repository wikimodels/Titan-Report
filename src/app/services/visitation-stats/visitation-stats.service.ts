import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';

import { SAVE_VISITATION_STATS } from 'consts/urls.consts';
import {
  VisitationPageType,
  VisitationStats,
} from 'src/models/user/visitation-stats';
import { UserInfoService } from './user-info.service';
import { SlackService } from '../shared/slack.service';

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
    private userInfoService: UserInfoService,
    private slackService: SlackService
  ) {}

  saveVisitationStats(visitationStats: VisitationStats) {
    visitationStats.user_info = this.userInfoService.getUserInfoSubj();
    visitationStats.leave_date = Date.now();
    visitationStats.stay_duraion = this.calculateStayDuration(visitationStats);
    this.postVisitationStats(visitationStats);
  }

  private postVisitationStats(data: VisitationStats) {
    this.http
      .post<VisitationStats>(SAVE_VISITATION_STATS(), data)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
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
