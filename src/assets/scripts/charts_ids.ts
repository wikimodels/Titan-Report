import { ChartsIds } from 'src/models/question-display';

export function getChartsIds(): ChartsIds[] {
  const q = {
    question_id: 1,
    chartsIds: [
      '10578d98-04ac-4965-b27d-33868b9c36d3',
      'bac00933-1a23-4ff4-a7c7-4f59cd7b24e9',
    ],
  };
  return [q];
}
