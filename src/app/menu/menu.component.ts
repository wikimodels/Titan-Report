import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CHARTS_QUESTION, RESPONDENTS } from 'consts/routes.consts';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import {
  OpenGraph,
  Question,
  Questionnaire,
  QuestionType,
} from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';
import { LoadingService } from '../services/shared/loading.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private cookieService: CookieService,
    public loadingService: LoadingService,
    private title: Title,
    private meta: Meta
  ) {}

  questionnaire: Questionnaire;
  openGraph: OpenGraph;
  sub: Subscription;

  ngOnInit(): void {
    this.loadingService.loadingOn();
    this.sub = this.questionnaireService.questionnaire$.subscribe((value) => {
      console.log('Questionnaire', value);
      this.questionnaire = value;
      this.openGraph = value.menu.open_graph;
      this.title.setTitle(this.openGraph.title);
      // this.meta.addTags([
      //   { name: 'og:title', content: this.openGraph.title },
      //   { name: 'og:description', content: this.openGraph.description },
      //   { name: 'og:image', content: this.openGraph.image },
      //   { name: 'og:url', content: this.openGraph.site_url },
      // ]);
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadingService.loadingOff();
    }, 0);
  }

  goToQuestionDisplay(question: Question) {
    let url;
    switch (question.question_type) {
      case QuestionType.RATING_ANSWER:
        url = QuestionType.RATING_ANSWER + '/' + question.question_id;
        break;
      case QuestionType.TEXT:
        url = QuestionType.TEXT + '/' + question.question_id;
        break;
      default:
        url = CHARTS_QUESTION + '/' + question.question_id;
        break;
    }
    this.router.navigate([url]);
  }

  goToRespondents() {
    this.router.navigate([RESPONDENTS]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
