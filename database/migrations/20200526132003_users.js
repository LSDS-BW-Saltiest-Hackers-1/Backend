
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
        comments.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
        .onDelete("CASCADE")
    })
    
    // .createTable("users_comments", users_comments => {
    //     users_comments.increments();

        // users_comments.integer("user_id")
        // .unsigned()
        // .notNullable()
        // .references("id")
        // .inTable("users")
        // .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
        // .onDelete("CASCADE")

    //     users_comments.integer("comments_id")
    //     .unsigned()
    //     .notNullable()
    //     .references("id")
    //     .inTable("comments")
    //     .onUpdate("CASCADE") // RESTRICT, DO NOTHING, SET NULL, CASCADE
    //     .onDelete("CASCADE")
    // })
};

exports.down = function(knex) {
  return knex.schema
  // .dropTableIfExists("users_comments")
  .dropTableIfExists("comments")
  .dropTableIfExists("users")
};
