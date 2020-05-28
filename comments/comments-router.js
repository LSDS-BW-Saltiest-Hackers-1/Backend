const router = require("express").Router();
const axios = require("axios");

const Comments = require("./comments-model");

router.get("/", (req, res) => {

    axios.get(`http://saltyapp.herokuapp.com/home`)
    .then(response => {
        res.status(200).json(response.data);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.get("/:id/favorites", (req, res) => {
    const {id} = req.params;

    Comments.getComments(id)
    .then(response => {
        // console.log(response);
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.post("/:id", (req, res) => {
    const {id} = req.params;
    const comment = req.body;

    Comments.addComment(id, comment)  
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.delete("/:id/remove/:comment_id", (req, res) => {
    const {id} = req.params;
    const {comment_id} = req.params;

    Comments.remove1(id, comment_id)
    .then(response => {
        // console.log(response) // Just gives back number of things deleted
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.get("/:id/favList", (req, res) => {
    const {id} = req.params;

    Comments.getLikedComments(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})


module.exports = router;