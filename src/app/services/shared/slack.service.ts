import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { LOG_CHANNEL } from 'consts/urls.consts';
import { throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SlackService {
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private http: HttpClient, private snotifyService: ) {}

  errorHandling(error: HttpErrorResponse) {
    const message = {
      fallback: 'This is an error message from Titan Survey',
      text: error.message,
      attachments: [
        {
          author_name: window.location.href,
          color: 'danger',
          title: 'Error Trace',
          text: error.statusText,
        },
        {
          author_name: window.location.href,
          color: 'danger',
          title: 'Error Trace',
          text: error.url,
        },
      ],
    };

    return this.http
      .post(LOG_CHANNEL(), message, { ...this.options, responseType: 'text' })
      .pipe(switchMap(() => throwError(error)));
  }
}
