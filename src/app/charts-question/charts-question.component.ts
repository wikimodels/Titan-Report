import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import * as moment from 'moment';
import { QuestionnaireService } from '../services/questionnaire.service';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';
import {
  VisitationPageType,
  VisitationStats,
} from 'src/models/user/visitation-stats';
import { UserInfoService } from '../services/visitation-stats/user-info.service';
import { ScrollTopService } from '../services/shared/scroll-to-top.service';

@Component({
  selector: 'app-charts-question',
  templateUrl: './charts-question.component.html',
  styleUrls: ['./charts-question.component.css'],
})
export class ChartsQuestionComponent
  implements OnInit, OnDestroy, AfterViewInit {
  question$: Observable<Question>;
  @ViewChild('charts') chartsContainer: ElementRef;
  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private visitationStatsService: VisitationStatsService
  ) {}

  questionId = +this.route.snapshot.params['question_id'];
  visitationStats = this.visitationStatsService.setVisitationStats(
    this.questionId,
    VisitationPageType.QUESTION
  );

  ngOnInit(): void {
    this.question$ = this.questionnaireService.question$(this.questionId);
  }

  ngAfterViewInit() {}
  ngOnDestroy() {
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
  }
}
