import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { RespondentsChartsService } from '../services/respondents/respondents-charts.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoadingService } from '../services/shared/loading.service';
import { ScrollTopService } from '../services/shared/scroll-to-top.service';
import { Router } from '@angular/router';
import { MENU } from 'consts/routes.consts';
import { OpenGraph, Questionnaire } from 'src/models/questionnaire.model';
import { Observable, Subscription } from 'rxjs';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QID } from 'consts/urls.consts';
import { VisitationStatsService } from '../services/visitation-stats/visitation-stats.service';
import { VisitationPageType } from 'src/models/user/visitation-stats';
import * as defaults from '../../assets/utils/defaults.json';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
  providers: [LoadingService],
})
export class RespondentsComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private respondentsService: RespondentsChartsService,
    private questionnaireService: QuestionnaireService,
    public loadingService: LoadingService,
    private router: Router,
    private visitationStatsService: VisitationStatsService,
    private meta: Meta,
    private title: Title,
    public deviceDetectorService: DeviceDetectorService
  ) {}

  openGraph: OpenGraph;
  sub: Subscription;
  elementHeight = defaults.respondentsElementHeight;
  questionnaire: Questionnaire;
  visitationStats = this.visitationStatsService.setVisitationStats(
    0,
    VisitationPageType.RESPONDENTS
  );

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe((value) => {
      this.questionnaire = value;
      if (value.respondents.open_graph) {
        this.openGraph = value.menu.open_graph;
        this.title.setTitle(this.openGraph.title);
        this.meta.addTags([
          // { name: 'og:title', content: this.openGraph.title },
          // { name: 'og:description', content: this.openGraph.description },
          // { name: 'og:image', content: this.openGraph.image },
          // { name: 'og:url', content: this.openGraph.site_url },
        ]);
      }
    });
    this.loadingService.loadingOn();
    this.respondentsService.getGroupedRespondents();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 6000);
  }
  goHome() {
    this.router.navigate([MENU]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.visitationStatsService.saveVisitationStats(this.visitationStats);
  }
}
