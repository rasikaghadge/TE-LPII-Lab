const router = require("express").Router()
const noteCtrl = require("./noteCtrl")

router.route("/")
    .get(noteCtrl.getAll)
    .post(noteCtrl.addNote)

router.route("/:id")
    .get(noteCtrl.getNote)
    .post(noteCtrl.updateNote)
    .delete(noteCtrl.deleteNote)

module.exports = router