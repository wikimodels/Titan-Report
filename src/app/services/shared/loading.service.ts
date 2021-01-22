import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, of } from 'rxjs';
import { concatMap, tap, finalize, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'any',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this.loadingOn();
      }),
      concatMap(() => obs$),
      finalize(() => {
        this.loadingOff();
      })
    );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
