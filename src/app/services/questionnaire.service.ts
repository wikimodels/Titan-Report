import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { Question, Questionnaire } from 'src/models/questionnaire.model';

import {
  GET_QUESTIONNAIRE_BY_QID,
  REPORT_LOG_CHANNEL,
  QID,
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';

import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';
import { SlackMessage } from 'src/models/slack-message';

import { MessageType } from 'src/models/message-types.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  questionnaire$ = this.getQuestionnaire();

  private getQuestionnaire(): Observable<Questionnaire> {
    let quesionnaireId = QID();
    return this.http
      .get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(quesionnaireId))
      .pipe(
        shareReplay(1),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
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
    this.http.post(UPLOAD_TEST_QUESTIONNAIRE(), q).subscribe(console.log);
  }
}
