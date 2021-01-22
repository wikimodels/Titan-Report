import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';
import { UserInfoService } from './services/visitation-stats/user-info.service';
import { VisitationStatsService } from './services/visitation-stats/visitation-stats.service';
import { ModalComponent } from './modal/modal.component';
import { DeviceDetectorService } from 'ngx-device-detector';

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
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService,
    private visitationStatsService: VisitationStatsService,
    private cookieService: CookieService,
    private userInfoService: UserInfoService,
    public dialog: MatDialog,
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
    //this.cookieService.delete('top');
  }

  generateTestData() {
    this.testS.getUserInfo();
  }
  uploadTestQuestionnaire() {
    this.questionnaireService.uploadTestQuestionnaire();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
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
