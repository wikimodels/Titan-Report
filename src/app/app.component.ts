import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading/is-loading/is-loading.service';

import { QID } from 'consts/urls.consts';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingService } from './services/shared/loading.service';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'titan-report';

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService
  ) {}

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaireByQid(QID());
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          //this.loadingService.loadingOn();
          return;
        }
        // Else navigation has ended, so `remove()` a loading indicator
        //this.loadingService.loadingOff();
      });
  }
  generateTestData() {
    this.testS.getUserInfo();
  }
}
