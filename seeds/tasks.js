
exports.seed = function (knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        { title: 'Mow Lawn', description: 'Mow the front and back lawn.  Use the string trimmer after', status: true },
        { title: 'Dishes', description: 'Stack plates in dishwasher and hand wash the pans', status: false },
        { title: 'Cook Dinner', description: 'Get the frozen fish sticks out of freezer and place in over for 30 minutes at 350 degrees', status: true },
        { title: '2Mow Lawn2', description: 'Mow the front and back lawn.  Use the string trimmer after', status: true },
        { title: '2Dishes2', description: 'Stack plates in dishwasher and hand wash the pans', status: false },
        { title: '2Cook Dinner2', description: 'Get the frozen fish sticks out of freezer and place in over for 30 minutes at 350 degrees', status: true }
      ]);
    });
};
