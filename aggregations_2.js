// Define by age
db.answers.aggregate([
  {
    $project: {
      _id: 0,
      city: "$user_info.city",
      age: { $arrayElemAt: ["$questions", 1] },
    },
  },

  { $unwind: "$age.question_answers" },
  {
    $group: {
      _id: {
        range: "$age.question_answers.answer_text",
        yes: "$age.question_answers.answer_boolean_reply",
      },
      count: { $sum: 1 },
    },
  },
  {
    $project: { _id: 0, range: "$_id.range", yes: "$_id.yes", count: "$count" },
  },
  { $match: { yes: true } },
  { $project: { "Возрастная группа": "$range", Количество: "$count" } },
]);

// СООТНОШЕНИЕ ПО ПОЛУ И ВОЗРАСТУ
db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      age: { $arrayElemAt: ["$questions", 1] },
      sex: { $arrayElemAt: ["$questions", 0] },
    },
  },

  { $unwind: "$age.question_answers" },
  { $unwind: "$sex.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        age: "$age.question_answers.answer_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        sex: "$sex.question_answers.answer_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
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
      sex_exists: "$_id",
    },
  },
  { $match: { $and: [{ age_exists: true }, { sex_exists: true }] } },
  { $project: { "Возрастная группа": "$age", Пол: "$sex" } },
]);

// СООТНОШЕНИЕ ПО ПОЛУ И ВОЗРАСТУ И СТАЖУ ТРЕНИРОВОК
db.answers.aggregate([
  {
    $project: {
      _id: 0,
      ip: "$user_info.ip",
      sex: { $arrayElemAt: ["$questions", 0] },
      age: { $arrayElemAt: ["$questions", 1] },
      training: { $arrayElemAt: ["$questions", 2] },
    },
  },

  { $unwind: "$sex.question_answers" },
  { $unwind: "$age.question_answers" },
  { $unwind: "$training.question_answers" },
  {
    $group: {
      _id: {
        person: "$ip",
        sex: "$sex.question_answers.answer_text",
        sex_exists: "$sex.question_answers.answer_boolean_reply",
        age: "$age.question_answers.answer_text",
        age_exists: "$age.question_answers.answer_boolean_reply",
        training: "$training.question_answers.answer_text",
        training_exists: "$training.question_answers.answer_boolean_reply",
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
      training: "$_id.training",
      training_exists: "$_id.training_exists",
    },
  },
  {
    $match: {
      $and: [
        { age_exists: true },
        { sex_exists: true },
        { training_exists: true },
      ],
    },
  },
  {
    $group: {
      _id: { sex: "$sex", age: "$age", training: "$training" },
      count: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      Пол: "$_id.sex",
      Возраст: "$_id.age",
      "Стаж занятий ОФП": "$_id.training",
      Количество: "$count",
    },
  },
]);
