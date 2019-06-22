const db = require("../data/dbConfig.js");
const User = require("./usersModel");

module.exports = {
  getAll,
  getTrainees,
  getCoaches,
  findBy,
  add,
  remove
};

function getAll() {
  return db("coaches");
}

async function getTrainees(coach_id) {
  const follows = await db("coaches").where({ coach: coach_id });
  return follows.map(follow => User.findById(follow.trainee));
}

async function getCoaches(trainee_id) {
  const follows = await db("coaches").where({ trainee: trainee_id });
  return follows.map(follow => User.findById(follow.coach));
}
function findBy(filter) {
  return db("coaches").where(filter);
}

async function add(coach_id, trainee_id) {
  await db("coaches").insert({ coach: coach_id, trainee: trainee_id });

  const link = await db("coaches")
    .where({ coach: coach_id, trainee: trainee_id })
    .first();
  return User.findById(link.trainee);
}

function remove(coach_id, trainee_id) {
  return db("coaches")
    .where({ coach: coach_id, trainee: trainee_id })
    .del();
}
