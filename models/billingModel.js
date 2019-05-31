const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  findBy,
  findById,
  add,
  remove
};

function getAll() {
  return db("billing");
}

function findBy(filter) {
  return db("billing").where(filter);
}

function findById(id) {
  return db("billing")
    .where({ id })
    .first();
}

async function add(billingInfo) {
  const [id] = await db("billing").insert(billingInfo, "id");

  return findById(id);
}

function remove(id) {
  return db("billing")
    .where("id", id)
    .del();
}