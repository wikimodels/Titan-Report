import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { TextAnswerView } from 'src/models/text-answer/text-answer-view';
import { TextAnswerService } from '../services/text-answer.service';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAnswerComponent implements OnInit {
  textAnswers$: Observable<TextAnswerView>;
  constructor(
    public textAnswerService: TextAnswerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.textAnswers$ = this.textAnswerService.textAnswers$(
      +this.route.snapshot.params['question_id']
    );
    // .subscribe(console.log);
  }
}
