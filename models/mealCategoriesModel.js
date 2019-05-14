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
  return db('mealCategories')
};

function findBy(filter){
  return db('mealCategories').where(filter);
};

function findById(id){
  return db('mealCategories')
  .where({ id })
  .first()
};

async function add(mealCategory){
  const [ id ] = await db('mealCategories').insert(mealCategory, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('mealCategories')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('mealCategories')
  .where('id', id)
  .del();
}
