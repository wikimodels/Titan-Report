import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionDisplay } from 'src/models/question-display';
import { Rating, RatingDisplay, RatingObj } from 'src/models/rating-display';
import { QuestionDisplayService } from '../services/question_display.service';
import { RatingDisplayService } from '../services/rating-display.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  ratingObjs: RatingObj[] = [
    {
      title: 'Оценка по полу',
      ratingQuestionIndex: 11,
      groupingQuestionIndex: 0,
    },
    {
      title: 'Оценка по возрасту',
      ratingQuestionIndex: 11,
      groupingQuestionIndex: 1,
    },
  ];
  starRating = 3.5;
  ratingObjTotal: RatingObj = {
    title: 'Общая оценка',
    ratingQuestionIndex: 11,
  };
  dataSource: Rating[];
  questionDisplay$: Observable<QuestionDisplay>;
  ratingDisplay$: Observable<RatingDisplay[]>;
  displayedColumns: string[] = ['category', 'stars', 'rating'];
  constructor(
    public ratingService: RatingDisplayService,
    private route: ActivatedRoute,
    public questionDisplayService: QuestionDisplayService
  ) {}

  ngOnInit(): void {
    this.ratingDisplay$ = this.ratingService.rating$(
      this.ratingObjTotal,
      this.ratingObjs
    );

    this.questionDisplay$ = this.questionDisplayService.questionDisplay$(
      +this.route.snapshot.params['question_id']
    );
  }
}
