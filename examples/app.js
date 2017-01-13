var config = {
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite"
  }
};
var knex = require('knex')(config);
var db = require('restive')(knex);

var role = {
  name: { type: 'string', length: 255, nullable: false, unique: true, default: 'user' },
  users: { type: 'many-many', reference: 'user' }, // auto generate tabe: role_user
  parent: { type: 'many-one', reference: 'role' }, // auto gen column: parentId, use `as` assign column name
  children: { type: 'one-many', reference: 'role', throgth: 'parentId' }
}

db.model(role);

db.sync();  // create or update database schema
