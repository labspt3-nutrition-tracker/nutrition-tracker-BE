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
  return db('foods')
};

function findBy(filter){
  return db('foods').where(filter);
};

function findById(id){
  return db('foods')
  .where({ id })
  .first()
};

async function add(food){
  const [ id ] = await db('foods').insert(food, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('foods')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('foods')
  .where('id', id)
  .del();
}
