const db = require("../database/dbConfig");

module.exports = {
    getComments,
    findComment,
    add,
    remove2,
    getLikedComments,
}

function getComments(id) {
    return db("users_comments as uc")
    .join("users as u", "u.id", "uc.user_id")
    .join("comments as c", "c.id", "uc.comments_id")
    .where("u.id", "=", `${id}`)
    .select("c.favorite_comments")
}

function findComment(id) {
    return db("comments")
    .where({id})
}

function add(id, favorite_comments) {
    console.log("THIS IS COMMENT", favorite_comments)
    return db("comments")
    .insert({"favorite_comments": `${favorite_comments}`, "user_id": `${id}`})
    .then(([id]) => {
        return findComment(id)
    })
}

function remove2(user_id, favorite_comments) {
    console.log("YOOO!!", user_id, favorite_comments)

    return db("comments")
    .where({"comments.user_id": `${user_id}`, "comments.favorite_comments": `${favorite_comments}`} )
    .del()
}

function getLikedComments(id) {
    return db("comments")
    .select("favorite_comments")
    .where({user_id: id})
}