import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RESPONDENTS } from 'consts/routes.consts';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    public questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  goToRespondents() {
    this.router.navigate([RESPONDENTS]);
  }
}
