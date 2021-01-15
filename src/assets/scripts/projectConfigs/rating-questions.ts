import { RatingObj } from 'src/models/rating-display/rating-obj';
import { RatingObjColl } from 'src/models/rating-display/rating-obj-coll';

export function getRatingCollForRatingQuestion(
  questionId: number
): RatingObjColl {
  const ratingQuestion = ratingPairing.find(
    (pair) => pair.rating_question_id == questionId
  );
  const pairedOjbs: RatingObj[] = [];
  ratingQuestion.paired_questions.forEach((q) => {
    let myRatingObj: RatingObj = {
      title: q.paired_question_title,
      ratingQuestionId: questionId,
      ratingQuestionIndex: questionId - 1,
      pairedQuestionId: q.paired_question_id,
      pairedQuestionIndex: q.paired_question_id - 1,
    };
    pairedOjbs.push(myRatingObj);
  });
  const ratingObj: RatingObj = {
    ratingQuestionId: questionId,
    ratingQuestionIndex: questionId - 1,
    title: 'Общий ретинг',
  };
  const ratingObjColl: RatingObjColl = {
    paired_rating_objs: pairedOjbs,
    rating_obj: ratingObj,
  };
  return ratingObjColl;
}

export const ratingPairing = [
  {
    rating_question_id: 12,
    paired_questions: [
      {
        paired_question_id: 1,
        paired_question_title: 'По полу',
      },
      {
        paired_question_id: 2,
        paired_question_title: 'По возрасту',
      },
    ],
  },
];
