export interface RatingObj {
  title: string;
  groupingQuestionIndex?: number;
  ratingQuestionIndex: number;
}

export interface RatingDisplay {
  title: string;
  ratings: [{ category: string; rating: number }];
}
