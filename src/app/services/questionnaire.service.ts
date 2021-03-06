import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import { Question, Questionnaire } from 'src/models/questionnaire.model';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';

import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';
import { SlackService } from './shared/slack.service';
import { DelayedRetriesService } from './shared/delayed-retries.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
  ) {}

  questionnaire$ = this.getQuestionnaire();

  private getQuestionnaire(): Observable<Questionnaire> {
    let quesionnaireId = QID();
    return this.http
      .get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(quesionnaireId))
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(5),
        catchError((error) => this.slackService.errorHandling(error)),
        shareReplay(1)
      );
  }

  question$(questionId: number): Observable<Question> {
    return this.questionnaire$.pipe(
      map((questionnaire: Questionnaire) => {
        const question = questionnaire.questions.find(
          (q) => q.question_id === questionId
        );
        return question;
      })
    );
  }

  uploadTestQuestionnaire() {
    const q = getPristionQuestionnaire();
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), q)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe(console.log);
  }
}
