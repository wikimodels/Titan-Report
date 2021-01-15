import { Component, Input, OnInit } from '@angular/core';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';

@Component({
  selector: 'app-text-answer-card',
  templateUrl: './text-answer-card.component.html',
  styleUrls: ['./text-answer-card.component.css'],
})
export class TextAnswerCardComponent implements OnInit {
  @Input() textAnswerQuestion: TextAnswerQuestion;
  @Input() index: number;
  constructor() {}

  ngOnInit(): void {}
}
