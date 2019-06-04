const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  edit,
  remove
};

function getAll() {
  return db("weightEntries");
}

function findBy(filter) {
  return db("weightEntries").where(filter);
}

function findById(id) {
  return db("weightEntries")
    .where({ id })
    .first();
}

async function add(weightEntry) {
  const [id] = await db("weightEntries").insert(weightEntry, "id");

  return findById(id);
}

async function edit(id, changes) {
  await db("weightEntries")
    .where("id", id)
    .update(changes);

  return findById(id);
}

function remove(id) {
  return db("weightEntries")
    .where("id", id)
    .del();
}
