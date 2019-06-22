const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  getTrainees,
  getCoaches,
  findBy,
  add,
  remove
}

function getAll() {
  return db("coaches");
}

async function getTrainees(coach_id){
  return await db("coaches")
    .where({coach: coach_id})
}

async function getCoaches(trainer_id){
  return await db("coaches")
    .where({trainee: trainer_id})
}
function findBy(filter) {
  return db("coaches").where(filter);
}

async function add(coach_id, trainer_id) {
  await db("coaches").insert({coach: coach_id, trainee: trainer_id});

  return db("coaches").where({coach: coach_id, trainee: trainer_id});
}

function remove(coach_id, trainer_id) {
  return db("coaches")
    .where({coach: coach_id, trainee: trainer_id})
    .del();
}
