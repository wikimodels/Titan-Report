import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  OpenGraph,
  Question,
  Questionnaire,
} from 'src/models/questionnaire.model';
import * as moment from 'moment';
import { QuestionnaireService } from '../services/questionnaire.service';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';
import * as defaults from '../../assets/utils/defaults.json';
import {
  VisitationPageType,
  VisitationStats,
} from 'src/models/user/visitation-stats';
import { UserInfoService } from '../services/visitation-stats/user-info.service';
import { ScrollTopService } from '../services/shared/scroll-to-top.service';
import { Title, Meta } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-charts-question',
  templateUrl: './charts-question.component.html',
  styleUrls: ['./charts-question.component.css'],
})
export class ChartsQuestionComponent
  implements OnInit, OnDestroy, AfterViewInit {
  question: Question;
  sub: Subscription;
  openGraph: OpenGraph;
  elementHeight = defaults.chartsElementHeight;
  @ViewChild('charts') chartsContainer: ElementRef;
  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    public deviceDetectorService: DeviceDetectorService,
    private visitationStatsService: VisitationStatsService,
    private title: Title,
    private meta: Meta
  ) {}

  questionId = +this.route.snapshot.params['question_id'];
  visitationStats = this.visitationStatsService.setVisitationStats(
    this.questionId,
    VisitationPageType.QUESTION
  );

  ngOnInit(): void {
    this.sub = this.questionnaireService
      .question$(this.questionId)
      .subscribe((value) => {
        this.question = value;
        if (this.question.open_graph) {
          this.openGraph = value.open_graph;
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

  ngAfterViewInit() {}
  ngOnDestroy() {
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
    this.sub.unsubscribe();
  }
}
