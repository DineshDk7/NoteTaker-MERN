const express = require('express')
const auth = require('../middleware/auth') 
const { addNotes, listNotes, updateNotes, deleteNotes } = require('../controllers/notesController')
const router = new express.Router()

router.route('/').post(auth, addNotes)

router.route('/').get(auth, listNotes)

router.route('/:id').patch(auth, updateNotes)

router.route('/:id').delete(auth, deleteNotes)

module.exports = router