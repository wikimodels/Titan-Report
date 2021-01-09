import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
} from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { QID } from 'consts/urls.consts';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { QuestionnaireService } from './services/questionnaire.service';
//TODO:Check isLoadingService. Not working.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'titan-report';
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    //private isLoadingService: IsLoadingService,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaireByQid(QID());
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        // If it's the start of navigation, `add()` a loading indicator
        if (event instanceof NavigationStart) {
          // this.isLoadingService.add();
          return;
        }
        // Else navigation has ended, so `remove()` a loading indicator
        //this.isLoadingService.remove();
      });
  }
}
