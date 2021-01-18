import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QID } from 'consts/urls.consts';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { QuestionnaireService } from '../services/questionnaire.service';
import { TextAnswerService } from '../services/text-answer.service';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css'],
})
export class TextAnswerComponent implements OnInit, OnDestroy {
  question$: Observable<Question>;
  textAnswerQuestions: TextAnswerQuestion[] = [];
  skip = 0;
  limit = 20;
  questionId = 0;
  collectionTotalCount = 0;
  textAnswerSub: Subscription;
  totalCountSub: Subscription;
  constructor(
    private textAnswerService: TextAnswerService,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionnaireService.question$(
      +this.route.snapshot.params['question_id']
    );

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
  }
}
