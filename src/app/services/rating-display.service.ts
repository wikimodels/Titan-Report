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

import { RatingDisplay } from 'src/models/rating-display/rating-display';
import { RatingDisplayView } from 'src/models/rating-display/rating-display-view';
import { RatingObj } from 'src/models/rating-display/rating-obj';
import { RatingObjColl } from 'src/models/rating-display/rating-obj-coll';
import * as defaults from '../../assets/utils/defaults.json';
@Injectable({
  providedIn: 'root',
})
export class RatingDisplayService {
  constructor(private http: HttpClient) {}

  ratingDisplayView$(questionId: number): Observable<RatingDisplayView> {
    const ratingObjs = this.getRatingCollForRatingQuestion(questionId);

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

  private getRatingCollForRatingQuestion(questionId: number): RatingObjColl {
    const ratingQuestion = defaults.ratingPairing.find(
      (pair) => pair.rating_question_id == questionId
    );
    const pairedOjbs: RatingObj[] = [];
    ratingQuestion.paired_questions.forEach((q) => {
      let myRatingObj: RatingObj = {
        title: q.paired_question_title,
        ratingQuestionId: questionId,
        ratingQuestionIndex: questionId - 1,
        pairedQuestionId: q.paired_question_id,
        pairedQuestionIndex: q.paired_question_id - 1,
      };
      pairedOjbs.push(myRatingObj);
    });
    const ratingObj: RatingObj = {
      ratingQuestionId: questionId,
      ratingQuestionIndex: questionId - 1,
      title: 'Общий ретинг',
    };
    const ratingObjColl: RatingObjColl = {
      paired_rating_objs: pairedOjbs,
      rating_obj: ratingObj,
    };
    return ratingObjColl;
  }
}
