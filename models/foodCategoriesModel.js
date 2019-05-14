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
  return db('foodCategories')
};

function findBy(filter){
  return db('foodCategories').where(filter);
};

function findById(id){
  return db('foodCategories')
  .where({ id })
  .first()
};

async function add(foodCategory){
  const [ id ] = await db('foodCategories').insert(foodCategory, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('foodCategories')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('foodCategories')
  .where('id', id)
  .del();
}
