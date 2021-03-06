const router = require("express").Router();

const Comments = require("./comments-model");

router.get("/:id/favorites", (req, res) => {
    const {id} = req.params;

    Comments.getLikedComments(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.post("/:id/add/:favorite_comments", (req, res) => {
    const {id} = req.params;
    const {favorite_comments} = req.params;

    Comments.add(id, favorite_comments)  
    .then(([response]) => {
        console.log("REsponso", response)
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

router.delete("/:id/remove/:comment_id", (req, res) => {
    const {id} = req.params;
    const {comment_id} = req.params;

    Comments.remove2(id, comment_id)
    .then(response => {
        res.status(200).json({ message: "The comment was successfully deleted"})
    })
    .catch(error => {
        res.status(500).json({ errorMessage: error });
    })
})

module.exports = router;