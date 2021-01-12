db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      sex: { $arrayElemAt: ["$questions", 0] },
      age: { $arrayElemAt: ["$questions", 1] },
      spendings: { $arrayElemAt: ["$questions", 7] },
    },
  },

  { $unwind: "$sex.question_answers" },
  { $unwind: "$age.question_answers" },
  { $unwind: "$spendings.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        sex: "$sex.question_answers.answer_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
        age: "$age.question_answers.answer_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        spendings: "$spendings.question_answers.answer_text",
        spendings_exists: "$spendings.question_answers.answer_boolean_reply",
      },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      age: "$_id.age",
      age_exists: "$_id.age_exists",
      sex: "$_id.sex",
      sex_exists: "$_id.sex_exists",
      spendings: "$_id.spendings",
      spendings_exists: "$_id.spendings_exists",
    },
  },
  {
    $match: {
      $and: [
        { age_exists: true },
        { sex_exists: true },
        { spendings_exists: true },
      ],
    },
  },
  {
    $group: {
      _id: { sex: "$sex", age: "$age", spendings: "$spendings" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      Пол: "$_id.sex",
      Возраст: "$_id.age",
      "Расходы на лечение": "$_id.spendings",
      Количество: "$count",
    },
  },
]);
