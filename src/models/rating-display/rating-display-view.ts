import { Question } from '../questionnaire.model';
import { RatingDisplay } from './rating-display';

export interface RatingDisplayView {
  question: Question;
  ratingDisplays: RatingDisplay[];
}
