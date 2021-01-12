import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {
  ChartDisplay,
  ChartsIds,
  QuestionDisplay,
} from 'src/models/question-display';
import { QuestionnaireService } from './questionnaire.service';
import { getChartsIds } from '../../assets/scripts/charts_ids';
import { DexieDbOpsService } from './dexie-indexedDb/dexie-idbs-ops.service';
import { GET_QUESTIONNAIRE_BY_QID, QID } from 'consts/urls.consts';
import { from, throwError } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { catchError, map, share, shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class QuestionDisplayService {
  constructor(
    private deviceDetector: DeviceDetectorService,
    private dexieIndexedDbService: DexieDbOpsService,
    private http: HttpClient,
    private questionnaireService: QuestionnaireService
  ) {}

  questionDisplay$(question_id: number) {
    const chartsIdsObj: ChartsIds = getChartsIds().find(
      (q) => q.question_id === question_id
    );
    const displayCharts = this.createChartsDisplays(chartsIdsObj);
    return this.http.get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(QID())).pipe(
      shareReplay(1),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }),
      map((questionnaire: Questionnaire) => {
        const question = questionnaire.questions.find(
          (q) => q.question_id === question_id
        );
        console.log('QUEST', question);
        return question;
      }),
      map((question: Question) => {
        const questionDisplay: QuestionDisplay = {
          question_id: question.question_id,
          question_text: question.question_text,
          charts: displayCharts,
        };
        return questionDisplay;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  private createChartsDisplays(chart: ChartsIds) {
    const displayCharts = [];
    chart.chartsIds.forEach((chartId) => {
      const chart = this.getDisplayChart(
        chartId,
        window.innerWidth,
        window.innerWidth,
        520,
        450
      );
      displayCharts.push(chart);
    });
    return displayCharts;
  }

  private getDisplayChart(
    chartId: string,
    widthXs,
    heightXs,
    widthLg,
    heightLg
  ) {
    let obj: ChartDisplay = { chart_id: chartId };
    obj.width = this.deviceDetector.isMobile() === true ? widthXs : widthLg;
    obj.height = this.deviceDetector.isMobile() === true ? heightXs : heightLg;
    return obj;
  }
}
