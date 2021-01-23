import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';
import { UserInfoService } from './services/visitation-stats/user-info.service';
import { VisitationStatsService } from './services/visitation-stats/visitation-stats.service';
import { DeviceDetectorService } from 'ngx-device-detector';

import { BasicSnackbarService } from './basic-snackbar/basic-snackbar.service';
import { MessageType } from './basic-snackbar/models/message-type';
import { IntroModalComponent } from './intro-modal/intro-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Titan Report';

  visitationStats = this.visitationStatsService.setVisitationStats(
    0,
    VisitationPageType.MAIN
  );
  constructor(
    readonly dialog: MatDialog,
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService,
    private visitationStatsService: VisitationStatsService,
    private cookieService: CookieService,
    private userInfoService: UserInfoService,

    private snackbarService: BasicSnackbarService,
    private deviceDetectorService: DeviceDetectorService
  ) {
    this.userInfoService.getUserInfo();
  }

  ngOnInit(): void {
    let intro = this.cookieService.get('intro');
    if (
      (this.deviceDetectorService.isMobile() && intro === '') ||
      intro === 'false'
    ) {
      this.openDialog();
    }
  }

  generateTestData() {
    this.snackbarService.open('Fuck', MessageType.WARNING);
    //this.testS.getUserInfo();
  }
  uploadTestQuestionnaire() {
    this.questionnaireService.uploadTestQuestionnaire();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(IntroModalComponent, {
      width: '90%',
      data: {},
      panelClass: 'custom-modalbox',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.cookieService.set('intro', result);
      console.log(result);
    });
  }
}
