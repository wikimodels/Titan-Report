import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { DataTableService } from 'src/app/services/chart-displays/data-table.service';
import { RespondentsChartsService } from 'src/app/services/chart-displays/respondents-charts.service';
import {
  GroupedRespondent,
  GroupedRespondentsApi,
} from 'src/models/grouped-respondent';

export interface SortedItem {
  active: string;
  direction: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  columns = ['flagUrl', 'country', 'city', 'count'];
  displayedColumns: string[] = ['flagUrl', 'country', 'count'];
  groupedRespondents: GroupedRespondent[] = [];
  sortedItem: SortedItem = { active: 'country', direction: 'desc' };
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  respondentsFG: FormGroup;
  countryChecked = false;
  cityChecked = false;
  labelPosition: 'before' | 'after' = 'after';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private chartService: RespondentsChartsService,
    private dataTableService: DataTableService
  ) {}

  ngOnInit(): void {
    this.respondentsFG = new FormGroup({
      country: new FormControl(true),
      city: new FormControl(false),
    });

    this.respondentsFG.valueChanges.subscribe((value) => {
      this.setCountryColumn(value['country']);
      this.setCityColumn(value['city']);
    });
  }
  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });
    this.dataTableService
      .tableData$(
        this.chartService.groupedRespondentsApiSubj$,
        this.paginator.page,
        this.sort.sortChange
      )
      .subscribe((value: GroupedRespondentsApi) => {
        console.log('Combined VAlue', value);
        setTimeout(() => {
          this.groupedRespondents = value.groupedRespondents;
          this.resultsLength = value.groupedRespondentsCount;
        }, 0);
      });
  }

  private setCountryColumn(isCheck: boolean) {
    if (isCheck) {
      this.displayedColumns = this.addColumn(this.displayedColumns, 'country');
    } else {
      this.displayedColumns = this.removeColumn(
        this.displayedColumns,
        'country'
      );
    }
  }
  private setCityColumn(isCheck: boolean) {
    if (isCheck) {
      this.displayedColumns = this.addColumn(this.displayedColumns, 'city');
    } else {
      this.displayedColumns = this.removeColumn(this.displayedColumns, 'city');
    }
  }

  addColumn(existingColumns: string[], addedColumn: string) {
    existingColumns.push(addedColumn);
    let myArray = [];
    this.columns.forEach((val) => {
      if (existingColumns.find((column) => column === val)) {
        myArray.push(val);
      }
    });
    return myArray;
  }

  removeColumn(existingColumns: string[], removedColumn: string) {
    let myColumns = existingColumns.filter(
      (column) => column !== removedColumn
    );
    return myColumns;
  }
}
