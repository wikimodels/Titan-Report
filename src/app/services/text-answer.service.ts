import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {
  GET_QUESTIONNAIRE_BY_QID,
  PAGED_QUESTIONS_TEXT_ANSWERS,
  QID,
  QUESTIONS_TEXT_ANSWERS,
  TOTAL_COUNT_OF_ANSWERS,
} from 'consts/urls.consts';
import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { TextAnswerView } from 'src/models/text-answer/text-answer-view';
import { TextAst } from '@angular/compiler';
const formatDisplayDate = 'DD MMM YYYY HH:mm';
@Injectable({
  providedIn: 'root',
})
export class TextAnswerService {
  constructor(private http: HttpClient) {}

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
        map((value: TextAnswerQuestion[]) => {
          value.forEach((v) => {
            v.submission_date = moment(v.submission_date)
              .locale('ru')
              .format(formatDisplayDate);
          });
          return value;
        }),
        catchError(this.handleError)
      )
      .subscribe((value: TextAnswerQuestion[]) => {
        this.setTextAnswerQuestionSub(value);
      });
  }

  question$(questionId: number) {
    return this.http
      .get<any>(GET_QUESTIONNAIRE_BY_QID(QID()))
      .pipe(
        map((questionnoire: Questionnaire) => {
          const question: Question = questionnoire.questions.find(
            (q) => q.question_id === questionId
          );
          return question;
        })
      )
      .pipe(shareReplay(1), catchError(this.handleError));
  }

  getCollectionCount() {
    this.http
      .get<number>(TOTAL_COUNT_OF_ANSWERS())
      .pipe(catchError(this.handleError))
      .subscribe((value) => {
        this.setCollectionCountSub(value);
      });
  }

  private handleError = (error) => {
    console.log(error);
    return throwError(error);
  };
}
