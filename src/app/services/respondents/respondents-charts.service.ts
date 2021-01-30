import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_ALL_USERS_GROUPED_BY_LOCATION } from 'consts/urls.consts';
import { BehaviorSubject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import {
  GroupedRespondent,
  GroupedRespondentsApi,
} from 'src/models/grouped-respondent';
import * as defaults from '../../../assets/utils/defaults.json';
import { DelayedRetriesService } from '../shared/delayed-retries.service';
import { SlackService } from '../shared/slack.service';
@Injectable({
  providedIn: 'root',
})
export class RespondentsChartsService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
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

  getGroupedRespondents() {
    this.http
      .get<GroupedRespondent[]>(GET_ALL_USERS_GROUPED_BY_LOCATION())
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(5),
        catchError((error) => this.slackService.errorHandling(error)),
        shareReplay(1)
      )
      .subscribe((value: GroupedRespondent[]) => {
        console.log('RESPONDENTS', value);
        const obj: GroupedRespondentsApi = {
          groupedRespondents: value,
          groupedRespondentsCount: value.length,
        };
        this.setGroupedRespondentsApiSubj(obj);
      });
  }
}
