import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionDisplay } from 'src/models/question-display';
import {
  Rating,
  RatingDisplay,
  RatingObj,
} from 'src/models/rating-display/rating-displa';
import { QuestionDisplayService } from '../services/question_display.service';
import { RatingDisplayService } from '../services/rating-display.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  constructor(
    public ratingService: RatingDisplayService,
    private route: ActivatedRoute
  ) {}
  ratingDisplayView$: Observable<any>;
  ngOnInit(): void {
    this.ratingDisplayView$ = this.ratingService.ratingDisplayView$(
      +this.route.snapshot.params['question_id']
    );
  }
}
