import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MENU,
  QUESTION_DISPLAY,
  RESPONDENTS,
  STAR_RATING,
} from 'consts/routes.consts';
import { QuestionType } from 'src/models/questionnaire.model';
import { MenuComponent } from './menu/menu.component';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { RatingComponent } from './rating/rating.component';

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
    path: QUESTION_DISPLAY + '/:question_id',
    component: QuestionDisplayComponent,
  },
  {
    path: QuestionType.RATING_ANSWER + '/:question_id',
    component: RatingComponent,
  },
  { path: '**', redirectTo: 'menu' },
  // {
  // path: QuestionType.BUTTON_SINGLE_ANSWER + '/:question_id',
  // component: ButtonSingleAnswerComponent,
  // },
  // {
  // path: QuestionType.CHECKBOX_MULTIPLE_ANSWER + '/:question_id',
  // component: CheckboxMultipleAnswerComponent,
  // },
  // {
  // path: QuestionType.TEXT + '/:question_id',
  // component: TextAnswerComponent,
  // },
  // {
  // path: QuestionType.RATING_ANSWER + '/:question_id',
  // component: RatingAnswerComponent,
  // },
  // {
  // path: QuestionType.IMAGE_SINGLE_ANSWER + '/:question_id',
  // component: ImageSingleAnswerComponent,
  // },
  // {
  // path: QuestionType.IMAGE_MULTI_ANSWER + '/:question_id',
  // component: ImageMultiAnswerComponent,
  // },
  // {
  // path: QuestionType.SPECIAL_IMAGE_MULTI_ANSWER + '/:question_id',
  // component: SpecialImageMultiAnswerComponent,
  // },
  // {
  // path: GREETINGS,
  // component: GreetingsComponent,
  // },
  // {
  // path: ANALYTICS,
  // loadChildren: () =>
  // import('./analytics-module/analytics.module').then(
  // (m) => m.AnalyticsModule
  // ),
  // },
  // {
  // path: COMPLETION,
  // component: CompletionComponent,
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
