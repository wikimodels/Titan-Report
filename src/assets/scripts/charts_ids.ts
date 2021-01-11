import { ChartsIds } from 'src/models/question-display';

export function getChartsIds(): ChartsIds[] {
  const q = {
    question_id: 1,
    chartsIds: [
      '10578d98-04ac-4965-b27d-33868b9c36d3',
      'f7e50699-8118-411f-8424-205c9d99c4d3',
    ],
  };
  return [q];
}
