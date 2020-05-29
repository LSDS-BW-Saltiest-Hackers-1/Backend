const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
})

describe("server", () => {
    describe(".", () => {
        it("can run the test", () => {
            expect(true).toBeTruthy();
        });
    });
});

/* // For token authorization
test("GET /api/auth to be successful", async () => {
    const register = await request(server)
    .post("/api/auth/register")
    .send({ username: "test1", password: "123123"});
    const login = await request(server)
    .post("/api/auth/login")
    .send({ username: "test1", password: "123123"})
    const res = await request(server)
    .get("/api/auth")
    .set("authorization", login.body.token)
    expect(res.status).toBe(200)
    // console.log("THIS IS LOGIN.BODY", res.body)
    expect(res.body).toHaveLength(4)
})
*/

test("/POST /api/users/register to be successful", async () => {
    const register = await request(server)
    .post("/api/users/register")
    .send({ first_name: "Mario", 
            last_name: "Fernandez", 
            username: "test1", 
            password: "123123"});
    expect(register.status).toBe(201);
    expect(register.body).toHaveLength(1);
    expect(register.body[0]).toHaveProperty("username")
    // console.log(register.body[0])
})

test("/POST /api/users/login to be successful", async () => {
    const register = await request(server)
    .post("/api/users/register")
    .send({ first_name: "Mario", 
            last_name: "Fernandez", 
            username: "test1", 
            password: "123123"});
    const login = await request(server)
    .post("/api/users/login")
    .send({username: "test1", password: "123123"});
    expect(login.status).toBe(200);
    expect(login.body.message).toMatch(/Welcome to our API/)
    expect(login.body).toHaveProperty("token")
    // console.log(login.body)
})

test("/GET /api/users to be successful", async () => {
    const allUsers = await request(server)
    .get("/api/users")
    expect(allUsers.body).toHaveLength(2)
    expect(allUsers.status).toBe(200);
    // console.log(allUsers.body)
})

test("/GET /api/users/:id to be successful", async () => {
    const oneUser = await request(server)
    .get("/api/users/1")
    expect(oneUser.body).toHaveLength(1)
    expect(oneUser.status).toBe(200);
    expect(oneUser.body[0]).toHaveProperty("first_name")
    expect(oneUser.body[0].first_name).toBe("Robin");
})

test("/PUT /api/users/:id to be successful", async () => {
    const update = await request(server)
    .put("/api/users/1")
    .send({ first_name: "New",
            last_name: "Everything",
            username: "Here",
            password: "Look"})
    expect(update.body).toHaveLength(1)
    expect(update.status).toBe(200);
    expect(update.body[0]).toHaveProperty("first_name")
    expect(update.body[0].first_name).toBe("New");
    // console.log(update.body[0])
})

test("/DELETE /api/users/:id to be successful", async () => {
    const delUser = await request(server)
    .delete("/api/users/2");
    expect(delUser.status).toBe(200);
    expect(delUser.body).toHaveProperty("message")
    expect(delUser.body.message).toMatch(/The user was successfully deleted!/)
    // console.log(delUser.body)
})

test("/GET /api/comments/:id/favorites", async () => {
    const favoriteComments = await request(server)
    .get("/api/comments/1/favorites")
    expect(favoriteComments.body).toHaveLength(2)
    expect(favoriteComments.body[0]).toHaveProperty("favorite_comments")
    expect(favoriteComments.body[1].favorite_comments).toBe(2)
    // console.log(favoriteComments.body)
})

test("/POST /api/comments/:id/add/:favorite_comments", async () => {
    const addComment = await request(server)
    .post("/api/comments/2/add/23409875")
    expect(addComment.body).toHaveProperty("favorite_comments")
    expect(addComment.body.favorite_comments).toBe(23409875)
    // console.log(addComment.body.favorite_comments)
})

test("/DELETE /api/comments/:id/remove/:comment_id", async () => {
    const delComment = await request(server)
    .del("/api/comments/1/remove/2")
    expect(delComment.body).toHaveProperty("message")
    expect(delComment.status).toBe(200)
    // console.log(delComment.body)
})