import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPIFY_IP,
  GET_USER_INFO_BY_IP,
  SUPPLY_IP_ADDRESSES_WITH_LOCATIONS,
  UPLOAD_BATCH_OF_ANSWERS,
} from 'consts/urls.consts';
import { catchError, map, tap, finalize, switchMap } from 'rxjs/operators';

import { UserInfo } from 'src/models/user-info.model';
import { getTestIps } from 'consts/test-ip-data';
import { Questionnaire, QuestionType } from 'src/models/questionnaire.model';
import {
  getPristionQuestionnaire,
  QUESTIONNAIRE_ANSWERED,
} from 'consts/answer';
import { from } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  constructor(private readonly http: HttpClient) {}

  //questionnaireAnswered: Questionnaire = QUESTIONNAIRE_ANSWERED;
  questionnairiesAnswered: Questionnaire[];
  endDate = '2021-01-07';
  startDate = '2021-01-01';

  getUserInfo() {
    this.http
      .post<UserInfo[]>(SUPPLY_IP_ADDRESSES_WITH_LOCATIONS(), getTestIps())
      .pipe(
        map((usersInfo: UserInfo[]) => {
          usersInfo.forEach((user) => {
            const device = this.getRandomDeviceInfo();
            user.location = {
              type: 'Point',
              coordinates: [user.lon, user.lat],
            };
            user.os = device.os;
            user.os_version = device.os_version;
            user.browser = device.browser;
          });
          return usersInfo;
        }),
        map((usersInfo: UserInfo[]) => {
          const questionnairesAnswered: Questionnaire[] = [];
          usersInfo.forEach((userInfo) => {
            let questionnaire: Questionnaire = {};
            questionnaire.user_info = userInfo;
            questionnaire.questions = this.supplyQuestionnairWithAnswers();
            questionnaire.submission_date = moment(
              this.momentRandom(moment(this.endDate), this.startDate)
            ).toISOString();

            questionnairesAnswered.push(questionnaire);
          });
          console.log('1-st questionnaire', questionnairesAnswered[0]);
          return questionnairesAnswered;
        }),
        switchMap((value) =>
          this.http.post<Questionnaire[]>(UPLOAD_BATCH_OF_ANSWERS(), value)
        ),
        catchError((error) => {
          console.log(error);
          return from([]);
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  private supplyQuestionnairWithAnswers() {
    let questionnaireAnswered = getPristionQuestionnaire();
    questionnaireAnswered.questions.forEach((q) => {
      switch (q.question_type) {
        case QuestionType.BUTTON_SINGLE_ANSWER:
          let bsaRandomIndex = this.getRandomInt(
            0,
            q.question_answers.length - 1
          );

          q.question_answers[bsaRandomIndex].answer_boolean_reply = true;
          break;

        case QuestionType.RADIO_SINGLE_ANSWER:
          let rsaRandomIndex = this.getRandomInt(
            0,
            q.question_answers.length - 1
          );

          q.question_answers[rsaRandomIndex].answer_boolean_reply = true;
          break;

        case QuestionType.IMAGE_SINGLE_ANSWER:
          let isaRandomIndex = this.getRandomInt(
            0,
            q.question_answers.length - 1
          );
          q.question_answers[isaRandomIndex].answer_boolean_reply = true;
          break;

        case QuestionType.RATING_ANSWER:
          let raRandomIndex = this.getRandomInt(
            0,
            q.question_answers.length - 1
          );
          q.question_answers[raRandomIndex].answer_boolean_reply = true;
          break;

        case QuestionType.CHECKBOX_MULTIPLE_ANSWER:
          let cbmaPositiveAnsweresNumber = +q.question_answers.length / 2;
          let chbmaPositiveAnswers = 0;
          while (chbmaPositiveAnswers < cbmaPositiveAnsweresNumber) {
            let cbmaRandomIndex = this.getRandomInt(
              0,
              q.question_answers.length - 1
            );
            q.question_answers[cbmaRandomIndex].answer_boolean_reply = true;

            chbmaPositiveAnswers = q.question_answers.filter(
              (a) => a.answer_boolean_reply === true
            ).length;
          }
          break;

        case QuestionType.IMAGE_MULTI_ANSWER:
          const imaPositiveAnsweresNumber = +q.question_answers.length / 2;
          let imaPositiveAnswers = 0;
          while (imaPositiveAnswers < imaPositiveAnsweresNumber) {
            let imaRandomIndex = this.getRandomInt(
              0,
              q.question_answers.length - 1
            );
            q.question_answers[imaRandomIndex].answer_boolean_reply = true;
            imaPositiveAnswers = q.question_answers.filter(
              (a) => a.answer_boolean_reply === true
            ).length;
          }
          break;

        case QuestionType.SPECIAL_IMAGE_MULTI_ANSWER:
          const simaPositiveAnsweresNumber = +q.question_answers.length / 2;
          let positiveAnswers = 0;
          while (positiveAnswers < simaPositiveAnsweresNumber) {
            let simaRandomIndex = this.getRandomInt(
              0,
              q.question_answers.length - 1
            );
            q.question_answers[simaRandomIndex].answer_boolean_reply = true;
            positiveAnswers = q.question_answers.filter(
              (a) => a.answer_boolean_reply === true
            ).length;
          }
          if (q.question_answers[0].answer_boolean_reply === true) {
            for (let i = 1; i < q.question_answers.length; i++) {
              q.question_answers[i].answer_boolean_reply = false;
            }
          }
          break;

        case QuestionType.TEXT:
          q.question_text_answer = this.getRandomText();
          break;
      }
    });
    return questionnaireAnswered.questions;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomText() {
    let text = '';
    let numberOfWords = this.getRandomInt(5, 10);
    for (let i = 0; i <= numberOfWords; i++) {
      let numberOfChars = this.getRandomInt(5, 10);
      let word = this.getRandomString(numberOfChars);
      text = text + word + ' ';
    }
    return text.trim();
  }

  private getRandomString(length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  private getRandomDeviceInfo() {
    const devices = [
      { os: 'Windows', os_version: 'Windows_10', browser: 'Opera' },
      { os: 'iOS', os_version: 'iOS 11', browser: 'Safari' },
      { os: 'Linux', os_version: 'Debian', browser: 'Mozilla' },
    ];
    const index = this.getRandomInt(0, devices.length - 1);
    return devices[index];
  }

  private momentRandom(end = moment(), start) {
    const endTime = +moment(end);
    const randomNumber = (to, from = 0) =>
      Math.floor(Math.random() * (to - from) + from);

    if (start) {
      const startTime = +moment(start);
      if (startTime > endTime) {
        throw new Error('End date is before start date!');
      }
      return moment(randomNumber(endTime, startTime));
    }
    return moment(randomNumber(endTime));
  }
}
