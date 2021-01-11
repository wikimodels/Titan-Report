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
@Injectable({
  providedIn: 'root',
})
export class QuestionDisplayService {
  constructor(
    private deviceDetector: DeviceDetectorService,
    private questionnaireService: QuestionnaireService
  ) {}

  getQuestionDisplay(question_id: number) {
    const question = this.questionnaireService
      .getQuestionnaireSubj()
      .questions.find((q) => q.question_id === question_id);

    const chartsIdsObj: ChartsIds = getChartsIds().find(
      (q) => q.question_id === question_id
    );

    const displayCharts = this.createChartsDisplays(chartsIdsObj);

    const questionDisplay: QuestionDisplay = {
      question_id: question.question_id,
      question_text: question.question_text,
      charts: displayCharts,
    };
    console.log(questionDisplay);
    return questionDisplay;
  }

  private createChartsDisplays(chart: ChartsIds) {
    const displayCharts = [];
    chart.chartsIds.forEach((chartId) => {
      const chart = this.getDisplayChart(
        chartId,
        window.innerWidth,
        window.innerWidth,
        500,
        400
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
