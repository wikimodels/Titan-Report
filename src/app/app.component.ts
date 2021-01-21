import { ViewportScroller } from '@angular/common';

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { asyncScheduler, interval } from 'rxjs';
import { filter, scan, observeOn, takeWhile } from 'rxjs/operators';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';
import { UserInfoService } from './services/visitation-stats/user-info.service';
import { VisitationStatsService } from './services/visitation-stats/visitation-stats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Titan Report';
  lastPoppedUrl = '';
  yScrollStack: number[] = [];
  scrollInterval: any;
  constructor(
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService,
    private visitationStatsService: VisitationStatsService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
    this.userInfoService.getUserInfo();
  }

  visitationStats = this.visitationStatsService.setVisitationStats(
    0,
    VisitationPageType.MAIN
  );

  ngOnInit(): void {
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationStart) {
        if (ev.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        } else {
          this.lastPoppedUrl = undefined;
          const yposition = this.yScrollStack.pop();
          console.log('Y-POSITION', this.yScrollStack.pop());
          let maxInterval = 0; // used to stop subscription
          interval(this.scrollInterval)
            .pipe(
              takeWhile((_) => window.scrollY < yposition && maxInterval < 5000)
            )
            .subscribe((_) => {
              maxInterval += this.scrollInterval;
              window.scrollTo({
                top: yposition,
                left: 0,
                behavior: 'smooth',
              });
            });
        }
      }
    });
  }

  generateTestData() {
    this.testS.getUserInfo();
  }
  uploadTestQuestionnaire() {
    this.questionnaireService.uploadTestQuestionnaire();
  }
  ngOnDestroy() {
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
  }
  //TODO:greeting message

  //TODO:analytics collector service
  //TODO:fix restore scroll position on navigation back
}
