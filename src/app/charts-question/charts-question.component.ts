import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { QID } from 'consts/urls.consts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questionnaire } from 'src/models/questionnaire.model';

import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-charts-question',
  templateUrl: './charts-question.component.html',
  styleUrls: ['./charts-question.component.css'],
})
export class ChartsQuestionComponent implements OnInit {
  toolTips = 'ttt';
  question$: Observable<Question>;
  @ViewChild('charts') chartsContainer: ElementRef;
  constructor(
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private scrollDispatcher: ScrollDispatcher
  ) {}

  buttonClass = 'jumpy-button';
  ngOnInit(): void {
    this.question$ = this.questionnaireService.question$(
      +this.route.snapshot.params['question_id']
    );
    // this.scrollDispatcher
    //   .scrolled()
    //   .subscribe((x) => console.log('I am scrolling'));
  }
  scrollToBottom() {
    this.buttonClass = 'clicked-bottom';
    console.log('clicked');
    console.log(this.chartsContainer.nativeElement.scrollHeight);
    window.scrollTo({
      top: this.chartsContainer.nativeElement.scrollHeight,
      behavior: 'smooth',
    });
  }
}
