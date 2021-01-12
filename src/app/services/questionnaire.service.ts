import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of, from } from 'rxjs';
import { catchError, map, tap, finalize, switchMap } from 'rxjs/operators';
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
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';
import { DexieDbOpsService } from './dexie-indexedDb/dexie-idbs-ops.service';
import { getTestQuestionnaire } from 'consts/test-data-questionnaire';

const formatDisplayDate = 'DD-MM-YY';
const formatDisplayTime = 'HH:mm';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(
    private http: HttpClient,
    private dexieIndexedDbService: DexieDbOpsService
  ) {}

  private _questionnaireDataSubj = new BehaviorSubject<QuestionnaireData>({
    questionnaire: {
      questionnaire_id: null,
      user_info: null,
      questions: [],
      creation_date: null,
      modification_date: null,
    },
  });
  questionnaireSubDataj$ = this._questionnaireDataSubj.asObservable();

  getQuestionnaireDataSubj(): QuestionnaireData {
    return this._questionnaireDataSubj.getValue();
  }

  setQuestionnaireDataSubj(questionnaireData: QuestionnaireData) {
    this._questionnaireDataSubj.next(questionnaireData);
  }

  async getQuestionnaireByQid(qid: string) {
    await this.dexieIndexedDbService.clearQuestionnaireDb();
    this.http
      .get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(qid))
      .pipe(
        tap((value: Questionnaire) => {
          const questionnaireData: QuestionnaireData = {
            questionnaire: value,
            data: {
              title: 'Данные о респондентах',
              subtitile: 'Геолокация, устройство входа и т.д.',
            },
          };
          this.setQuestionnaireDataSubj(questionnaireData);
        }),
        switchMap((value: Questionnaire) =>
          from(this.dexieIndexedDbService.addQuestionnaire(value))
        ),
        catchError((error) => {
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  uploadTestQuestionnaire() {
    const q = getTestQuestionnaire();
    this.http.post(UPLOAD_TEST_QUESTIONNAIRE(), q).subscribe(console.log);
  }
  // updateInternally(question: Question) {
  //   const questionnaire = this.getQuestionnaireSubj();
  //   const index = question.question_id - 1;
  //   questionnaire.questions[index] = question;
  //   console.log('updated questionnaire ', questionnaire);
  //   this.setQuestionnaireSubj(questionnaire);
  // }

  // getFirstQuestionUrl() {
  //   return this.getQuestionnaireSubj().first_question_url;
  // }
}
