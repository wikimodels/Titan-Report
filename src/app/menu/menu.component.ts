import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CHARTS_QUESTION, RESPONDENTS } from 'consts/routes.consts';
import { QID } from 'consts/urls.consts';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';
import {
  Question,
  Questionnaire,
  QuestionType,
} from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';
import { LoadingService } from '../services/shared/loading.service';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  questionnaire$: Observable<Questionnaire>;
  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.questionnaire$ = this.questionnaireService.questionnaire$;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 0);
  }
  goToQuestionDisplay(question: Question) {
    let url;
    switch (question.question_type) {
      case QuestionType.RATING_ANSWER:
        url = QuestionType.RATING_ANSWER + '/' + question.question_id;
        break;
      case QuestionType.TEXT:
        url = QuestionType.TEXT + '/' + question.question_id;
        break;
      default:
        url = CHARTS_QUESTION + '/' + question.question_id;
        break;
    }
    this.router.navigate([url]);
  }

  goToRespondents() {
    this.router.navigate([RESPONDENTS]);
  }
}
