db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      sex: { $arrayElemAt: ["$questions", 0] },
      age: { $arrayElemAt: ["$questions", 1] },
      problmes: { $arrayElemAt: ["$questions", 13] },
    },
  },
  { $unwind: "$sex.question_answers" },
  { $unwind: "$age.question_answers" },
  { $unwind: "$problmes.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        sex: "$sex.question_answers.answer_chart_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
        age: "$age.question_answers.answer_chart_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        problmes: "$problmes.question_answers.answer_chart_text",
        problmes_exists: "$problmes.question_answers.answer_boolean_reply",
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
      problmes: "$_id.problmes",
      problmes_exists: "$_id.problmes_exists",
    },
  },
  {
    $match: {
      $and: [
        { age_exists: true },
        { sex_exists: true },
        { problmes_exists: true },
      ],
    },
  },
  {
    $group: {
      _id: { sex: "$sex", age: "$age", problmes: "$problmes" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      Пол: "$_id.sex",
      Возраст: "$_id.age",
      "Уровень знания": "$_id.problmes",
      Количество: "$count",
    },
  },
]);

db.visitation_stats.aggregate([
  {
    $project: {
      ip: "$user",
      enter_date: { $toDate: { $multiply: ["$enter_date", 1] } },
    },
  },
]);
