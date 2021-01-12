// Age, sex and type of physical activity
// СООТНОШЕНИЕ ПО ПОЛУ И ВОЗРАСТУ И СТАЖУ ТРЕНИРОВОК
db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      sex: { $arrayElemAt: ["$questions", 0] },
      age: { $arrayElemAt: ["$questions", 1] },
      activity: { $arrayElemAt: ["$questions", 3] },
    },
  },

  { $unwind: "$sex.question_answers" },
  { $unwind: "$age.question_answers" },
  { $unwind: "$activity.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        sex: "$sex.question_answers.answer_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
        age: "$age.question_answers.answer_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        activity: "$activity.question_answers.answer_text",
        activity_exists: "$activity.question_answers.answer_boolean_reply",
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
      activity: "$_id.activity",
      activity_exists: "$_id.activity_exists",
    },
  },
  {
    $match: {
      $and: [
        { age_exists: true },
        { sex_exists: true },
        { activity_exists: true },
      ],
    },
  },
  {
    $group: {
      _id: { sex: "$sex", age: "$age", activity: "$activity" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      Пол: "$_id.sex",
      Возраст: "$_id.age",
      "Тип нагрузок": "$_id.activity",
      Количество: "$count",
    },
  },
]);
