
exports.up = function (knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('task_id'); // adds an auto incrementing PK column
    table.string('title');
    table.string('description');
    table.string('status');
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tasks');
};
