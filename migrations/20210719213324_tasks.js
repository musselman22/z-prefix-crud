
exports.up = function (knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id'); // adds an auto incrementing PK column
    table.string('title');
    table.string('description');
    table.boolean('status');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
