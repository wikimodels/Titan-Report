import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questionnaire } from 'src/models/questionnaire.model';

import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-charts-question',
  templateUrl: './charts-question.component.html',
  styleUrls: ['./charts-question.component.css'],
})
export class ChartsQuestionComponent implements OnInit {
  question$: Observable<Question>;
  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.question$ = this.questionnaireService.question$(
      +this.route.snapshot.params['question_id']
    );
  }
}
