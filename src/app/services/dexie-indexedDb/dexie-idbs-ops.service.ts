import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Questionnaire } from 'src/models/questionnaire.model';
import { DexieQuestionnaireService } from './dexie-idbs.service';

@Injectable({
  providedIn: 'root',
})
export class DexieDbOpsService {
  questionnaireTable: Dexie.Table<Questionnaire>;

  constructor(private dexieQuestionnaireService: DexieQuestionnaireService) {
    this.questionnaireTable = this.dexieQuestionnaireService.table(
      'questionnaire'
    );
  }

  async addQuestionnaire(questionnaire: Questionnaire) {
    return await this.questionnaireTable.add(questionnaire);
  }
  async getQuestionnaire(questionnaire_id: String) {
    return await this.questionnaireTable.get(questionnaire_id);
  }

  async deleteQuestionnaireFromPdaDb(questionnaireId: string) {
    return await this.questionnaireTable.delete(questionnaireId);
  }

  async clearQuestionnaireDb() {
    return await this.questionnaireTable.clear();
  }
}
