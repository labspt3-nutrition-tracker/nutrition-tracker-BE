const db = require("../data/dbConfig.js");

module.exports = {
  findBy,
  findById,
  add,
  remove
};

function findBy(filter) {
  return db("messages").where(filter);
}

function findById(id) {
  return db("messages")
    .where({ id })
    .first();
}

async function add(message) {
  const [id] = await db("messages").insert(message, "id");
  return findById(id);
}

function remove(id) {
  return db("messages")
    .where("id", id)
    .del();
}
