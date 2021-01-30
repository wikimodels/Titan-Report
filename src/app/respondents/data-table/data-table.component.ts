import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DeviceDetectorService } from 'ngx-device-detector';

import { DataTableService } from 'src/app/services/respondents/data-table.service';
import { RespondentsChartsService } from 'src/app/services/respondents/respondents-charts.service';
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
  desktopColumns = ['flagUrl', 'country', 'city', 'count'];
  mobileColumns = ['flagUrl', 'city', 'count'];
  displayedColumns: string[];
  groupedRespondents: GroupedRespondent[] = [];
  sortedItem: SortedItem = { active: 'country', direction: 'desc' };
  resultsLength = 0;
  respondentsFG: FormGroup;
  showChbxes = false;

  labelPosition: 'before' | 'after' = 'after';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private chartService: RespondentsChartsService,
    private dataTableService: DataTableService,
    private deviceDetector: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    if (this.deviceDetector.isMobile()) {
      this.showChbxes = true;
      this.displayedColumns = this.mobileColumns;
    } else {
      this.showChbxes = false;
      this.displayedColumns = this.desktopColumns;
    }
    this.respondentsFG = new FormGroup({
      country: new FormControl(false),
      city: new FormControl(true),
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
        setTimeout(() => {
          console.log('RES', value.groupedRespondents);
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
    this.desktopColumns.forEach((val) => {
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
