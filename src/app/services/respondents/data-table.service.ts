import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GroupedRespondentsApi } from 'src/models/grouped-respondent';
import * as defaults from '../../../assets/utils/defaults.json';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  previousDirection = 'desc';
  tableData$(
    respondents$,
    sortChange$,
    paginatorPage$
  ): Observable<GroupedRespondentsApi> {
    return combineLatest(
      respondents$.pipe(startWith(defaults.groupedRespondentsApi)),
      sortChange$.pipe(startWith(defaults.sortChange)),
      paginatorPage$.pipe(startWith(defaults.sortedItem))
    ).pipe(
      map((value) => {
        let [respondentsApi, page, sort] = value;

        const prop = sort['active'] === 'flagUrl' ? 'country' : sort['active'];

        if (sort['direction'] === 'asc') {
          respondentsApi['groupedRespondents'].sort(
            (a, b) => a[prop] - b[prop]
          );
        }
        if (sort['direction'] === 'desc') {
          respondentsApi['groupedRespondents'].sort(
            (a, b) => b[prop] - a[prop]
          );
        }

        // COUNTRY PROP (A WAY TO COMPARE STRINGS)
        if (sort['direction'] === 'asc' && prop == 'country') {
          respondentsApi['groupedRespondents'].sort((a, b) =>
            a.country.localeCompare(b.country)
          );
        }
        if (sort['direction'] === 'desc' && prop != 'country') {
          respondentsApi['groupedRespondents'].sort((a, b) =>
            b.country.localeCompare(a.country)
          );
        }

        // CITY PROP (A WAY TO COMPARE STRINGS)
        if (sort['direction'] === 'asc' && prop == 'city') {
          respondentsApi['groupedRespondents'].sort((a, b) =>
            a.city.localeCompare(b.city)
          );
        }
        if (sort['direction'] === 'desc' && prop != 'city') {
          respondentsApi['groupedRespondents'].sort((a, b) =>
            b.country.localeCompare(a.city)
          );
        }

        if (sort['direction'] != this.previousDirection) {
          page['pageIndex'] = 0;
          this.previousDirection = sort['direction'];
        }

        const array = respondentsApi['groupedRespondents'].slice(
          page['pageIndex'] * page['pageSize'],
          page['pageIndex'] * page['pageSize'] + page['pageSize']
        );

        const obj: GroupedRespondentsApi = {
          groupedRespondents: array,
          groupedRespondentsCount: respondentsApi['groupedRespondents'].length,
        };
        return obj;
      })
    );
  }
}
