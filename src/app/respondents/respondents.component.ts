import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RespondentsChartsService } from '../services/respondents/respondents-charts.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoadingService } from '../services/shared/loading.service';
import { ScrollTopService } from '../services/shared/scroll-to-top.service';
import { Router } from '@angular/router';
import { MENU } from 'consts/routes.consts';
import { Questionnaire } from 'src/models/questionnaire.model';
import { Observable } from 'rxjs';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QID } from 'consts/urls.consts';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
  providers: [LoadingService],
})
export class RespondentsComponent implements OnInit, AfterViewInit {
  constructor(
    private respondentsService: RespondentsChartsService,
    private questionnaireService: QuestionnaireService,
    public loadingService: LoadingService,
    private router: Router
  ) {}

  questionnaire$: Observable<Questionnaire>;

  ngOnInit(): void {
    this.questionnaire$ = this.questionnaireService.questionnaire$();
    this.loadingService.loadingOn();
    this.respondentsService.getGroupedRespondents();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 6000);
  }
  goHome() {
    this.router.navigate([MENU]);
  }
}
