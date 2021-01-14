import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  ChartDisplay,
  ChartsIds,
  QuestionDisplay,
} from 'src/models/question-display';
import { QuestionnaireService } from './questionnaire.service';
import { getChartsIds } from '../../../consts/charts_ids';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  QUESTIONS_TEXT_ANSWERS,
} from 'consts/urls.consts';
import { from, Observable, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, share, shareReplay } from 'rxjs/operators';
import { QuestionTextAnswer } from 'src/models/question-text-answer';
@Injectable({
  providedIn: 'root',
})
export class TextAnswerService {
  constructor(
    private http: HttpClient,
    private questionnaireService: QuestionnaireService
  ) {}

  textAnswers$(questionIndex: number): Observable<QuestionTextAnswer[]> {
    return this.http
      .get<QuestionTextAnswer[]>(QUESTIONS_TEXT_ANSWERS(questionIndex))
      .pipe(
        shareReplay(1),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      );
  }
}
