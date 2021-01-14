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
  RATING_AVGS_BY_QUESTION_INDEX,
  RATING_AVGS_TOTAL,
} from 'consts/urls.consts';
import { combineLatest, concat, from, Observable, of, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, share, shareReplay } from 'rxjs/operators';
import { RatingDisplay, RatingObj } from 'src/models/rating-display';
@Injectable({
  providedIn: 'root',
})
export class RatingDisplayService {
  constructor(private http: HttpClient) {}

  rating$(
    ratingObjTotal: RatingObj,
    ratingObjs: RatingObj[]
  ): Observable<RatingDisplay[]> {
    const ratingTotal$ = this.ratingAvgsTotal$(ratingObjTotal);
    const ratingObjs$ = this.ratingAvgsByQuestionIndex$(ratingObjs);

    return combineLatest(
      ratingTotal$,
      ratingObjs$,
      (a: RatingDisplay, b: RatingDisplay[]) => {
        b.push(a);
        return b;
      }
    ).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  ratingAvgsByQuestionIndex$(
    ratingObjs: RatingObj[]
  ): Observable<RatingDisplay[]> {
    return this.http.post<RatingDisplay[]>(
      RATING_AVGS_BY_QUESTION_INDEX(),
      ratingObjs
    );
  }

  ratingAvgsTotal$(ratingObj: RatingObj): Observable<RatingDisplay> {
    return this.http.post<RatingDisplay>(RATING_AVGS_TOTAL(), ratingObj);
  }
}
