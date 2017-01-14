var config = {
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  }
};
var knex = require('knex')(config);
var db = require('restive')(knex);

var role = {
  name: { type: 'string', length: 255, nullable: false, unique: true, defaultTo: 'user' },  // same as knex.js
  users: { type: 'many-many', reference: 'user' }, // auto generate tabe: role_user
  parent: { type: 'many-one', reference: 'role' }, // auto gen column: parent_id, use `as` assign column name
  children: { type: 'one-many', reference: 'role', throgth: 'parent_id' }
}

db.model('role', role);

db.sync();  // create or update database schema

/**
 * api
 */
db('user').find(options).then(users) // or findOne()
db('user').create(data).then(user)  // data maybe {} or []
db('user').update(data, options).then(count)
db('user').remove(options).then(count)

/**
 * options query
 * $limit, $offset, $sort, $select, $include
 * 
{ include: 'role' }
{ include: ['user', 'role'] }
{
  include: {
    'user': {
      where: ''
    },
    'role': {
      where: ''
    }
  }
}
{ offset: 5, limit: 5 }
 */

/**
 * query $where
 * $in, $nin, $lt, $lte, $gt, $gte, $ne, $or, $like, $null
 * 
{
  name: {
    $like: 'Jo%'
  }
  email: {
    $null: false
  },
  rank: {
    $or: {
      $gt: 90,
      $lt: 30
    }
  },
  $or: [
    {
      title: {
        $like: 'Boat%'
      }
    }, {
      description: {
        $like: '%boat%'
      }
    }
  ]
}
 */
