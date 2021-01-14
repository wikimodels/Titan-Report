db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      sex: { $arrayElemAt: ["$questions", 0] },
      age: { $arrayElemAt: ["$questions", 1] },
      rating: { $arrayElemAt: ["$questions", 11] },
    },
  },

  { $unwind: "$sex.question_answers" },
  { $unwind: "$age.question_answers" },
  { $unwind: "$rating.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        sex: "$sex.question_answers.answer_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
        age: "$age.question_answers.answer_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        rating: "$rating.question_answers.answer_text",
        rating_exists: "$rating.question_answers.answer_boolean_reply",
      },
      rating_avg: { $avg: "$rating.question_answers.answer_value" },
    },
  },
  {
    $project: {
      _id: 0,
      age: "$_id.age",
      age_exists: "$_id.age_exists",
      sex: "$_id.sex",
      sex_exists: "$_id.sex_exists",
      rating: "$_id.rating",
      rating_exists: "$_id.rating_exists",
      rating_avg: { $round: ["$rating_avg", 2] },
    },
  },
  {
    $match: {
      $and: [
        { age_exists: true },
        { sex_exists: true },
        { rating_exists: true },
      ],
    },
  },
  // {
  //   $group: {
  //     _id: { sex: "$sex", age: "$age", rating: "$rating" },
  //     count: { $sum: 1 },
  //   },
  // },
  // {
  //   $project: {
  //     _id: 0,
  //     Пол: "$_id.sex",
  //     Возраст: "$_id.age",
  //     "Проблемные места": "$_id.rating",
  //     Количество: "$count",
  //   },
  // },
]);
