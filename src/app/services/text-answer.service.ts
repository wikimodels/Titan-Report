import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {
  PAGED_QUESTIONS_TEXT_ANSWERS,
  TOTAL_COUNT_OF_ANSWERS,
} from 'consts/urls.consts';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { SlackService } from './shared/slack.service';
import { DelayedRetriesService } from './shared/delayed-retries.service';

const formatDisplayDate = 'DD MMM YYYY HH:mm';
@Injectable({
  providedIn: 'any',
})
export class TextAnswerService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
  ) {}

  // Collection Count
  _collectionCountSub = new BehaviorSubject<number>(0);
  collectionCountSub$ = this._collectionCountSub.asObservable();

  setCollectionCountSub(value: number) {
    this._collectionCountSub.next(value);
  }
  getCollectionCountSub() {
    this._collectionCountSub.getValue();
  }

  //Text Answer
  _textAnswerQuestionsSub = new BehaviorSubject<TextAnswerQuestion[]>([]);

  textAnswerQuestionSub$ = this._textAnswerQuestionsSub.asObservable();

  getTextAnswerQuestionSub() {
    this._textAnswerQuestionsSub.getValue();
  }

  setTextAnswerQuestionSub(value) {
    this._textAnswerQuestionsSub.next(value);
  }

  getPagedQuestions(questionId: number, skip: number, limit: number) {
    const questionIndex = questionId - 1;
    this.http
      .get<TextAnswerQuestion[]>(
        PAGED_QUESTIONS_TEXT_ANSWERS(questionIndex, skip, limit)
      )
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(5),
        catchError((error) => this.slackService.errorHandling(error)),
        map((value: TextAnswerQuestion[]) => {
          value.forEach((v) => {
            v.creation_date_string = moment(v.creation_date)
              .locale('ru')
              .format(formatDisplayDate);
          });
          return value;
        })
      )
      .subscribe((value: TextAnswerQuestion[]) => {
        this.setTextAnswerQuestionSub(value);
      });
  }

  getCollectionCount() {
    this.http
      .get<number>(TOTAL_COUNT_OF_ANSWERS())
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(5),
        catchError((error) => this.slackService.errorHandling(error)),
        shareReplay(1)
      )
      .subscribe((value: number) => {
        this.setCollectionCountSub(value);
      });
  }
}
