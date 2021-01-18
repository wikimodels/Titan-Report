import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { MongodbChartComponent } from './mongodb-chart/mongodb-chart.component';
import { MongoPipe } from './pipes/mongo.pipe';
import { DataTableComponent } from './respondents/data-table/data-table.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RatingComponent } from './rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarsComponent } from './rating/stars/stars.component';

import { RatingTableComponent } from './rating/rating-table/rating-table.component';
import { TextAnswerComponent } from './text-answer/text-answer.component';
import { TextAnswerCardComponent } from './text-answer/text-answer-card/text-answer-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { ChartsQuestionComponent } from './charts-question/charts-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    RespondentsComponent,
    MongodbChartComponent,
    MongoPipe,
    DataTableComponent,
    NavBarComponent,
    RatingComponent,
    StarsComponent,
    RatingTableComponent,
    TextAnswerComponent,
    TextAnswerCardComponent,
    ChartsQuestionComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
