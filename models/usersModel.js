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
  return db('users')
};

function findBy(filter){
  return db('users').where(filter);
};

function findById(id){
  return db('users')
  .where({ id })
  .first()
};

async function add(user){
  const [ id ] = await db('users').insert(user, "id");

  return findById(id);
};

async function edit(id, changes){
  await db('users')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('users')
  .where('id', id)
  .del();
}
