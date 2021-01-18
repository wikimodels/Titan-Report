import { Component, OnInit } from '@angular/core';
import { QID } from 'consts/urls.consts';
import { QuestionnaireService } from './services/questionnaire.service';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Titan Report';

  constructor(
    private questionnaireService: QuestionnaireService,
    private testS: TestDataService
  ) {}

  ngOnInit(): void {
    //this.questionnaireService.getQuestionnaireByQid(QID());
  }

  generateTestData() {
    this.testS.getUserInfo();
  }
  uploadTestQuestionnaire() {
    this.questionnaireService.uploadTestQuestionnaire();
  }
}
