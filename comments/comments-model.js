const db = require("../database/dbConfig");

module.exports = {
    getComments,
    findLast,
    findComment,
    add,
    // joinTables,
    addComment,
    findBy,
    remove1,
    findIfTrue,
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

function findLast(id) {
    return db("comments")
    .select("id")
    .orderBy("id", "desc").limit(1)    
}


function findComment(id) {
    return db("comments")
    .where({id})
}

function add(id, favorite_comments) {
    console.log("THIS IS COMMENT", favorite_comments)
    return db("comments")
    .insert({"favorite_comments": `${favorite_comments}`, "user_id": `${id}`})
    .then(id => {
        return findComment(id[0])
    })
}

// function joinTables(id) {
//     return db("users_comments")
//     .select("favorite_comments")
//     .join("users as U", "U.id", "UC.user_id")
//     .join("comments as C", "C.id", "UC.comments_id")
//     .where("U.id", "=", `${id}`)
// }

function addComment(id, favorite_comments) {
    return add(id, favorite_comments)
    .then(([response]) => {
        /* console.log(response) EXAMPLE DATA: { id: 13, favorite_comments: 333 } */
        return db("users_comments as UC")
        .insert({user_id: id, comments_id: response.id})
        // .then(response => {
        //     return joinTables(id)
        // })
    })
}

function findBy(favorite_comments) {
    return db("comments")
    .where({favorite_comments})
}

function remove2(user_id, favorite_comments) {
    console.log("YOOO!!", user_id, favorite_comments)

    return db("comments")
    .where({"comments.user_id": `${user_id}`, "comments.favorite_comments": `${favorite_comments}`} )
    .del()
}

function findIfTrue(res, user_id) {    
    console.log("test",user_id)
    return db("users_comments")
    .where({"users_comments.comments_id": `${res.id}`, "users_comments.user_id": `${user_id}`})
}

function remove1(id, favorite_comments) {
    return findBy(favorite_comments) /* EXAMPLE DATA: { id: 2, favorite_comments: 2 } */
    .then(([res]) => {
        return db("users_comments")
        .where({"users_comments.user_id": `${id}`,"users_comments.comments_id": `${res.id}`})
        .del()
        .then(() => {
            console.log("RES!!",res.id) // data is 7
            return remove2(id, res.favorite_comments) 
        })
    })
}

function getLikedComments(id) {
    return db("comments")
    .select("favorite_comments")
    .where({user_id: id})
}