import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/models/questionnaire.model';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import { QuestionnaireService } from '../services/questionnaire.service';
import { TextAnswerService } from '../services/text-answer.service';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';
import * as defaults from '../../assets/utils/defaults.json';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css'],
})
export class TextAnswerComponent implements OnInit, AfterViewInit, OnDestroy {
  question$: Observable<Question>;
  textAnswerQuestions: TextAnswerQuestion[] = [];
  skip = 0;
  limit = 20;
  elementHeight = defaults.textElementHeight;
  collectionTotalCount = 0;
  questionId = +this.route.snapshot.params['question_id'];
  visitationStats = this.visitationStatsService.setVisitationStats(
    this.questionId,
    VisitationPageType.QUESTION
  );
  textAnswerSub: Subscription;
  totalCountSub: Subscription;
  constructor(
    private textAnswerService: TextAnswerService,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    //private scrollToTopService: ScrollTopService,
    private visitationStatsService: VisitationStatsService
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionnaireService.question$(this.questionId);
    this.textAnswerService.getCollectionCount();
    this.textAnswerService.getPagedQuestions(
      this.questionId,
      this.skip,
      this.limit
    );

    this.textAnswerSub = this.textAnswerService.textAnswerQuestionSub$.subscribe(
      (value: TextAnswerQuestion[]) => {
        value.forEach((val) => {
          this.textAnswerQuestions.push(val);
        });
        console.log(this.textAnswerQuestions);
      }
    );

    this.totalCountSub = this.textAnswerService.collectionCountSub$.subscribe(
      (value) => {
        this.collectionTotalCount = value;
        console.log(this.collectionTotalCount);
      }
    );
  }

  ngAfterViewInit() {}
  onScroll() {
    const textAnswerQuestionsCount = this.textAnswerQuestions.length;
    if (textAnswerQuestionsCount < this.collectionTotalCount) {
      this.skip = this.skip + 1;
      console.log('Scrolled', this.skip);
      this.textAnswerService.getPagedQuestions(
        this.questionId,
        this.skip,
        this.limit
      );
    }
  }
  ngOnDestroy() {
    this.totalCountSub.unsubscribe();
    this.textAnswerSub.unsubscribe();
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
  }
}
