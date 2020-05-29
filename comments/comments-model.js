const db = require("../database/dbConfig");

module.exports = {
    findComment,
    add,
    remove2,
    getLikedComments,
}

function findComment(id) {
    return db("comments")
    .where({id})
}

function add(id, favorite_comments) {
    return db("comments")
    .insert({"favorite_comments": favorite_comments, "user_id": id})
    .then(id => {
        return findComment(id[0])
    })
}

function remove2(user_id, favorite_comments) {
    return db("comments")
    .where({"comments.user_id": `${user_id}`, "comments.favorite_comments": `${favorite_comments}`} )
    .del()
}

function getLikedComments(id) {
    return db("comments")
    .select("favorite_comments")
    .where({user_id: id})
}