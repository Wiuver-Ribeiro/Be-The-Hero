
exports.up = function(knex) {
  return knex.schema.createTable('donors', function(table) {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.sting('creditData').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('donors');
};
