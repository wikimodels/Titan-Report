import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MENU, RESPONDENTS } from 'consts/routes.consts';
import { MenuComponent } from './menu/menu.component';
import { RespondentsComponent } from './respondents/respondents.component';

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
  // {
  // path: QuestionType.RADIO_SINGLE_ANSWER + '/:question_id',
  // component: SingleRadioAnswerComponent,
  // },
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
