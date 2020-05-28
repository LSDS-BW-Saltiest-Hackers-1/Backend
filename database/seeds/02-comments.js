
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {favorite_comments: 1, user_id: 1},
        {favorite_comments: 2, user_id: 1},
        {favorite_comments: 2, user_id: 2},
      ]);
    });
};
