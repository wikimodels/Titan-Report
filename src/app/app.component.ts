import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { asyncScheduler } from 'rxjs';
import { filter, scan, observeOn } from 'rxjs/operators';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Titan Report';

  constructor(
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService,

    private router: Router
  ) {}

  ngOnInit(): void {}

  generateTestData() {
    this.testS.getUserInfo();
  }
  uploadTestQuestionnaire() {
    this.questionnaireService.uploadTestQuestionnaire();
  }
  //TODO:button down
  //TODO:greeting message
  //TODO:large screens layout
  //TODO:analytics collector service
  //TODO:fix restore scroll position on navigation back
}
