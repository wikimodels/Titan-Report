import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionDisplay } from 'src/models/question-display';
import { DexieDbOpsService } from '../services/dexie-indexedDb/dexie-idbs-ops.service';
import { DexieQuestionnaireService } from '../services/dexie-indexedDb/dexie-idbs.service';
import { QuestionDisplayService } from '../services/question_display.service';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css'],
  providers: [QuestionDisplayService],
})
export class QuestionDisplayComponent implements OnInit {
  questionDisplay: QuestionDisplay;
  constructor(
    private route: ActivatedRoute,
    private questionDisplayService: QuestionDisplayService
  ) {}
  questionDisplay$: Observable<QuestionDisplay>;
  ngOnInit() {
    this.questionDisplay$ = this.questionDisplayService.questionDisplay$(
      +this.route.snapshot.params['question_id']
    );
  }
}
