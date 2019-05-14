const db = require('../data/dbConfig.js');

module.exports ={
  getAll,
  findBy,
  findById,
  add,
  edit,
  remove
}

function getAll() {
  return db('foodEntries')
};

function findBy(filter){
  return db('foodEntries').where(filter);
};

function findById(id){
  return db('foodEntries')
  .where({ id })
  .first()
};

async function add(foodEntry){
  const [ id ] = await db('foodEntries').insert(foodEntry, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('foodEntries')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('foodEntries')
  .where('id', id)
  .del();
}
