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
  return db('exerciseEntries')
};

function findBy(filter){
  return db('exerciseEntries').where(filter);
};

function findById(id){
  return db('exerciseEntries')
  .where({ id })
  .first()
};

async function add(exerciseEntry){
  const [ id ] = await db('exerciseEntries').insert(exerciseEntry, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('exerciseEntries')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('exerciseEntries')
  .where('id', id)
  .del();
}
