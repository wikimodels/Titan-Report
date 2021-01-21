import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import { RatingDisplayService } from '../services/rating-display.service';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit, OnDestroy {
  constructor(
    public ratingService: RatingDisplayService,
    private route: ActivatedRoute,
    private visitationStatsService: VisitationStatsService
  ) {}

  ratingDisplayView$: Observable<any>;
  questionId = +this.route.snapshot.params['question_id'];
  visitationStats = this.visitationStatsService.setVisitationStats(
    this.questionId,
    VisitationPageType.QUESTION
  );

  ngOnInit(): void {
    this.ratingDisplayView$ = this.ratingService.ratingDisplayView$(
      this.questionId
    );
  }
  ngOnDestroy() {
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
  }
}
