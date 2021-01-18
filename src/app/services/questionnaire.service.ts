import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of, from } from 'rxjs';
import {
  catchError,
  map,
  tap,
  finalize,
  switchMap,
  shareReplay,
} from 'rxjs/operators';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { UserInfo } from 'src/models/user-info.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  Question,
  Questionnaire,
  QuestionnaireData,
  QuestionType,
} from 'src/models/questionnaire.model';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';

import { getTestQuestionnaire } from 'consts/test-data-questionnaire';
import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';

const formatDisplayDate = 'DD-MM-YY';
const formatDisplayTime = 'HH:mm';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}

  questionnaire$(): Observable<Questionnaire> {
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

  question$(questionId: number) {
    return this.questionnaire$().pipe(
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
