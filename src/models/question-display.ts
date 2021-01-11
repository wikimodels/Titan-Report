export interface ChartDisplay {
  chart_id: string;
  width?: string;
  height?: string;
}

export interface QuestionDisplay {
  question_id: number;
  question_text?: string;
  charts: ChartDisplay[];
}
export interface ChartsIds {
  question_id: number;
  chartsIds: string[];
}
