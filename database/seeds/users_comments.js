
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users_comments').delete()
    .then(function () {
      // Inserts seed entries
      return knex('users_comments').insert([
        {user_id: 1, comments_id: 1},
        {user_id: 1, comments_id: 2},
        {user_id: 2, comments_id: 3},
      ]);
    });
};
