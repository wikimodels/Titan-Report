import { Injectable } from '@angular/core';
import * as defaults from '../../../assets/utils/defaults.json';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class DexieQuestionnaireService extends Dexie {
  constructor() {
    super(defaults.QuestionnaireDbName);
    this.version(1).stores({
      questionnaire: 'questionnaire_id',
    });
  }
}
