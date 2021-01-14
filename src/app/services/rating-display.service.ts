import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  RATING_AVGS_PAIRED,
  RATING_AVGS_TOTAL,
} from 'consts/urls.consts';
import { combineLatest, Observable, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { getRatingCollForRatingQuestion } from 'src/assets/scripts/projectConfigs/rating-questions';
import { RatingDisplay } from 'src/models/rating-display/rating-display';
import { RatingDisplayView } from 'src/models/rating-display/rating-display-view';

@Injectable({
  providedIn: 'root',
})
export class RatingDisplayService {
  constructor(private http: HttpClient) {}

  ratingDisplayView$(questionId: number): Observable<RatingDisplayView> {
    const ratingObjs = getRatingCollForRatingQuestion(questionId);

    const totalRating$ = this.http.post<RatingDisplay>(
      RATING_AVGS_TOTAL(),
      ratingObjs.rating_obj
    );
    const pairedRating$ = this.http.post<RatingDisplay[]>(
      RATING_AVGS_PAIRED(),
      ratingObjs.paired_rating_objs
    );
    const question$ = this.http.get<any>(GET_QUESTIONNAIRE_BY_QID(QID())).pipe(
      map((questionnoire: Questionnaire) => {
        const question: Question = questionnoire.questions.find(
          (q) => q.question_id === questionId
        );
        return question;
      })
    );
    return combineLatest(
      question$,
      totalRating$,
      pairedRating$,
      (question, totalRating, pairedRating) => {
        pairedRating.push(totalRating);
        return [question, pairedRating];
      }
    ).pipe(
      shareReplay(1),
      map((value) => {
        const displayRatingView: RatingDisplayView = {
          question: value[0] as Question,
          ratingDisplays: value[1] as RatingDisplay[],
        };
        return displayRatingView;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
