import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionDisplay } from 'src/models/question-display';
import { QuestionDisplayService } from '../services/question_display.service';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css'],
})
export class QuestionDisplayComponent implements OnInit {
  questionDisplay: QuestionDisplay;
  constructor(
    private route: ActivatedRoute,
    private questionDisplayService: QuestionDisplayService
  ) {}

  ngOnInit(): void {
    const urlQuestionId = +this.route.snapshot.params['question_id'];
    this.questionDisplay = this.questionDisplayService.getQuestionDisplay(
      urlQuestionId
    );
  }
}
