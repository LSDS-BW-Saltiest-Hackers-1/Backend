const Users = require("../users/users-model"); 

module.exports = {
    validateUserId,
    validateUser,
    validateLogin,
}

function validateUserId(req, res, next) {
    const { id } = req.params;
    Users.findBy(id)
    .then(user => {
      if(user[0]){
        next();
      } else {
        res.status(404).json({message: `User with the id of ${id} was not found`})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'Could not get user'})
    });
}

function validateUser(req, res, next) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
       return res.status(400).json({ message: "Missing user data" })
     } else {
      if (!req.body.username) {
       return res.status(400).json({ message: "Missing required field: username" })
     } else if(!req.body.first_name){
      return res.status(400).json({ message: "Missing required field: first_name"})
     } else if(!req.body.last_name) {
      return res.status(400).json({ message: "Missing required field: last_name"})
     } else if(!req.body.password) {
        return res.status(400).json({ message: "Missing required field: password"})
       }
    next();
     }
  }

function validateLogin(req, res, next) {
    if (Boolean(req.body.username && req.body.password && typeof req.body.password === "string")) {
        next()
    } else {
        res.status(400).json({ message: "Missing credentials username and/or password" });
    }
}