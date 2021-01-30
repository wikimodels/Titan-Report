import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, tap } from 'rxjs/operators';
import { SlackService } from './slack.service';

const getErrorMessage = (maxRetry: number) =>
  `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACKOFF = 1000;
@Injectable({
  providedIn: 'root',
})
export class DelayedRetriesService {
  constructor(private slackService: SlackService) {}

  retryWithoutBackoff(retries) {
    return retryWhen((errors: Observable<any>) =>
      errors.pipe(
        delay(500),
        tap(() => {
          console.log('retry...');
        }),
        mergeMap((error) => (retries-- > 0 ? of(error) : throwError(error)))
      )
    );
  }

  retryWithBackoff(
    delayMs: number,
    maxRetry = DEFAULT_MAX_RETRIES,
    backoffMs = DEFAULT_BACKOFF
  ) {
    let retries = maxRetry;
    return (src: Observable<any>) =>
      src.pipe(
        retryWhen((errors: Observable<any>) =>
          errors.pipe(
            mergeMap((error) => {
              if (retries-- > 0) {
                const backoffTime = delayMs * (maxRetry - retries) * backoffMs;
                return of(error).pipe(delay(backoffTime));
              }
              return throwError(error);
            })
          )
        )
      );
  }
}
