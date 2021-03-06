const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const Users = require("./users-model");
const restricted = require("./users-authentication"); //NOT BEING USED ATM
const {validateUser, validateUserId, validateLogin} = require("../middleware/index");

/*
.then(response => {
    res.status(200).json(response);
})
.catch(error => {
    res.status(500).json({ errorMessage: error });
})
*/

router.get("/", (req, res) => {
    Users.getAll()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.get("/:id", validateUserId, (req, res) => {
    const {id} = req.params;

    Users.findBy(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.post("/register", validateUser, (req, res) => {
    const user = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcryptjs.hashSync(user.password, rounds)
    user.password = hash;

    Users.register(user)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.post("/login", validateLogin, (req, res) => {
    const {username, password} = req.body;

    Users.findByUsers({username})
    .then(([response]) => {
        // Compare the password the hash stored in the databsae 
        if(response && bcryptjs.compareSync(password, response.password)) {
            const token = createToken(response);

            res.status(200).json({ message: "Welcome to our API", token });
        } else {
            res.status(401).json({ message: "Access Denied: Unauthorized" });
        }
    })
})

router.put("/:id", validateUser, validateUserId, (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Users.editUser(changes, id)
    .then(() => {
        Users.findBy(id)
        .then(response => {
            res.status(200).json(response);
        })
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.delete("/:id", validateUserId, (req, res) => {
    const {id} = req.params;

    Users.deleteUser(id)
    .then(response => {
        res.status(200).json({ message: "The user was successfully deleted!" });
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

function createToken(user) {
    const payload = {
        sub: user.id,
        username: user.username,
    };

    const secret = process.env.JWT_SECRET || "secretmysteryyouwillneverfind";

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secret, options)
}

module.exports = router;
