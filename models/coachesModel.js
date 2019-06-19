const db = require("../data/dbConfig.js");

function getAll() {
  return db("coaches");
}

function findBy(filter) {
  return db("coaches").where(filter);
}

async function add(coach_id, trainer_id) {
  await db("coaches").insert({coach: coach_id, trainee: trainer_id});
  .returning("coach", "trainee");
}

function remove(coach_id, trainer_id) {
  return db("coaches")
    .where({coach: coach_id, trainee: trainer_id})
    .del();
}
