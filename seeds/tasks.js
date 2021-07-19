
exports.seed = function (knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        { title: 'Mow Lawn', description: 'Mow the front and back lawn.  Use the string trimmer after', status: 'Complete' },
        { title: 'Dishes', description: 'Stack plates in dishwasher and hand wash the pans', status: 'Partially complete' },
        { title: 'Cook Dinner', description: 'Get the frozen fish sticks out of freezer and place in over for 30 minutes at 350 degrees', status: 'Need to do' }
      ]);
    });
};
