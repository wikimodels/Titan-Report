import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  QUESTIONS_TEXT_ANSWERS,
} from 'consts/urls.consts';
import { combineLatest, Observable, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { TextAnswerView } from 'src/models/text-answer/text-answer-view';
const formatDisplayDate = 'DD MMM YYYY HH:mm';
@Injectable({
  providedIn: 'root',
})
export class TextAnswerService {
  constructor(private http: HttpClient) {}

  textAnswers$(questionId: number): Observable<TextAnswerView> {
    const question$ = this.http
      .get<any>(GET_QUESTIONNAIRE_BY_QID(QID()))
      .pipe(
        map((questionnoire: Questionnaire) => {
          const question: Question = questionnoire.questions.find(
            (q) => q.question_id === questionId
          );
          return question;
        })
      )
      .pipe(shareReplay(1));

    const textAnswersQuestions$ = this.http
      .post<TextAnswerQuestion[]>(QUESTIONS_TEXT_ANSWERS(), questionId - 1)
      .pipe(
        shareReplay(1),
        map((value: TextAnswerQuestion[]) => {
          value.forEach((v) => {
            v.submission_date = moment(v.submission_date)
              .locale('ru')
              .format(formatDisplayDate);
          });
          return value;
        })
      );

    return combineLatest(question$, textAnswersQuestions$).pipe(
      map((value) => {
        const textAnswerView: TextAnswerView = {
          question: value[0] as Question,
          textAnswerQuestions: value[1] as TextAnswerQuestion[],
        };
        console.log(textAnswerView);
        return textAnswerView;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
