
exports.up = function(knex) {
  return knex.schema.createTable('investment', function (table) {
    table.float('value');

    table.string('donor_id');
    table.string('incident_id');

    table.foreign('donor_id').references('id').inTable('donor');
    table.foreign('incident_id').references('id').inTable('incidents')

    table.timestamp('created_at').defaulTo(knex.fn.now());
    table.timestamp('updated_at').defaulTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('investment');
};
