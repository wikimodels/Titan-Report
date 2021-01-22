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
import { VisitationStats } from 'src/models/user/visitation-stats';

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
export class UserInfoService {
  constructor(
    private readonly http: HttpClient,
    private deviceService: DeviceDetectorService
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
    this.http
      .get(IPIFY_IP())
      .pipe(
        map((value) => {
          const ip = value['ip'].split(',')[0];
          return ip;
        }),
        switchMap((value) => {
          return this.http
            .get<UserInfo>(GET_USER_INFO_BY_IP(value))
            .pipe(shareReplay(1));
        }),
        map((value: UserInfo) => {
          const deviceInfo = this.deviceService.getDeviceInfo();
          value.location = {
            type: 'Point',
            coordinates: [value.lon, value.lat],
          };
          value.os = deviceInfo.os;
          value.os_version = deviceInfo.os_version;
          value.browser = deviceInfo.browser;
          return value;
        }),
        shareReplay(1),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe((value: UserInfo) => {
        this.setUserInfoSubj(value);
      });
  }
}
