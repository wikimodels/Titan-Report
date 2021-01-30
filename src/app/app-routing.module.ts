import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CHARTS_QUESTION,
  MENU,
  RESPONDENTS,
  STAR_RATING,
} from 'consts/routes.consts';
import { QuestionType } from 'src/models/questionnaire.model';
import { MenuComponent } from './menu/menu.component';

import { RespondentsComponent } from './respondents/respondents.component';
import { RatingComponent } from './rating/rating.component';
import { TextAnswerComponent } from './text-answer/text-answer.component';
import { ChartsQuestionComponent } from './charts-question/charts-question.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: MENU,
    pathMatch: 'full',
  },
  {
    path: MENU,
    component: MenuComponent,
  },
  {
    path: RESPONDENTS,
    component: RespondentsComponent,
  },
  {
    path: CHARTS_QUESTION + '/:question_id',
    component: ChartsQuestionComponent,
  },
  {
    path: QuestionType.RATING_ANSWER + '/:question_id',
    component: RatingComponent,
  },
  {
    path: QuestionType.TEXT + '/:question_id',
    component: TextAnswerComponent,
  },
  { path: '**', redirectTo: 'menu' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    initialNavigation: 'enabled'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
