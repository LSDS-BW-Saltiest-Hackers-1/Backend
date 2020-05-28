
exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
        users.increments();

        users.string("first_name", 255).notNullable()
        users.string("last_name", 255).notNullable()
        users.string("username", 255).notNullable().unique()
        users.string("password", 255).notNullable()
    })
    .createTable("comments", comments => {
        comments.increments();

        comments.integer("favorite_comments").notNullable()
        comments.integer("user_id").notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("comments")
  .dropTableIfExists("users")
};
