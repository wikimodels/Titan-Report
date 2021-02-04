import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OpenGraph } from 'src/models/questionnaire.model';
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
    private visitationStatsService: VisitationStatsService,
    private title: Title,
    private meta: Meta
  ) {}

  ratingDisplayView: any;
  sub: Subscription;
  openGraph: OpenGraph;
  questionId = +this.route.snapshot.params['question_id'];
  visitationStats = this.visitationStatsService.setVisitationStats(
    this.questionId,
    VisitationPageType.QUESTION
  );

  ngOnInit(): void {
    this.sub = this.ratingService
      .ratingDisplayView$(this.questionId)
      .subscribe((value) => {
        this.ratingDisplayView = value;
        if (this.ratingDisplayView.question.open_grpah) {
          this.openGraph = this.ratingDisplayView.question.open_grpah;
          this.title.setTitle(this.openGraph.title);
          this.meta.addTags([
            { name: 'og:title', content: this.openGraph.title },
            { name: 'og:description', content: this.openGraph.description },
            { name: 'og:image', content: this.openGraph.image },
            { name: 'og:url', content: this.openGraph.site_url },
          ]);
        }
      });
  }
  ngOnDestroy() {
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
    this.sub.unsubscribe();
  }
}
