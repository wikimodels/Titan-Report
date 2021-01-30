import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, shareReplay } from 'rxjs/operators';

import { UserInfo } from 'src/models/user/user-info.model';
import { DeviceDetectorService } from 'ngx-device-detector';

import { IPIFY_IP, GET_USER_INFO_BY_IP } from 'consts/urls.consts';
import { SlackService } from '../shared/slack.service';
import { DelayedRetriesService } from '../shared/delayed-retries.service';

declare global {
  interface Window {
    ActiveXObject: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(
    private readonly http: HttpClient,
    private deviceService: DeviceDetectorService,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
  ) {}

  private _userInfoSubj = new BehaviorSubject<UserInfo>(null);
  userInfoSubj$ = this._userInfoSubj.asObservable();

  getUserInfoSubj(): UserInfo {
    return this._userInfoSubj.getValue();
  }
  setUserInfoSubj(value: UserInfo) {
    this._userInfoSubj.next(value);
  }

  getUserInfo() {
    return this.http
      .get(IPIFY_IP())
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(3),
        catchError((error) => this.slackService.errorHandling(error)),
        map((value) => {
          const ip = value['ip'].split(',')[0];
          return ip;
        }),
        switchMap((value) => {
          return this.http.get<UserInfo>(GET_USER_INFO_BY_IP(value)).pipe(
            this.delayedRetriesService.retryWithoutBackoff(5),
            catchError((error) => this.slackService.errorHandling(error))
          );
        }),
        map((value: UserInfo) => {
          const deviceInfo = this.deviceService.getDeviceInfo();
          console.log('UI', deviceInfo);
          value.location = {
            type: 'Point',
            coordinates: [value.lon, value.lat],
          };
          value.os = deviceInfo.os;
          value.os_version = deviceInfo.os_version;
          value.browser = deviceInfo.browser;
          return value;
        })
      )
      .subscribe((value: UserInfo) => {
        this.setUserInfoSubj(value);
      });
  }
}
