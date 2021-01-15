import { Question } from '../questionnaire.model';
import { TextAnswerQuestion } from './text-answer-question';

export interface TextAnswerView {
  question: Question;
  textAnswerQuestions: TextAnswerQuestion[];
}
