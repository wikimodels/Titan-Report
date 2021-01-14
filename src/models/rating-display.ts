export interface RatingObj {
  title: string;
  groupingQuestionIndex?: number;
  ratingQuestionIndex: number;
}

export interface RatingDisplay {
  title: string;
  ratings: Rating[];
}
export interface Rating {
  category: string;
  rating: number;
}
