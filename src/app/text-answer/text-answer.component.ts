import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionDisplay } from 'src/models/question-display';
import { QuestionTextAnswer } from 'src/models/question-text-answer';
import { QuestionDisplayService } from '../services/question_display.service';
import { RatingDisplayService } from '../services/rating-display.service';
import { TextAnswerService } from '../services/text-answer.service';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css'],
})
export class TextAnswerComponent implements OnInit {
  questionDisplay$: Observable<QuestionDisplay>;
  textAnswers$: Observable<QuestionTextAnswer[]>;
  questionIndex = 18;
  constructor(
    public textAnswerService: TextAnswerService,
    private route: ActivatedRoute,
    public questionDisplayService: QuestionDisplayService
  ) {}

  ngOnInit(): void {
    this.textAnswers$ = this.textAnswerService.textAnswers$(this.questionIndex);
    this.questionDisplay$ = this.questionDisplayService.questionDisplay$(
      +this.route.snapshot.params['question_id']
    );
  }
}
