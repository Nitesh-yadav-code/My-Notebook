const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Rout 1: Get all the notes using : GEt "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured");
      }
})
// Rout 2: Add a new note using : POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must contain allest 5 character").isLength({
        min: 5,
    }),
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        // if there are errors, return Bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occured");
    }
})

// Rout 3: update  an existing notes using : PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        
   
    const { title, description, tag } = req.body;

    // create a new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it
    let note =   await Note.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not Found");
    }
    if(note.user.toString() !== req.user.id ){
        return res.status(401).send("Not Allowed");
    }

    note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Occured");
}

})

// Rout 4: delete  an existing notes using : DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {


    //find the note to be deleted and delete it
    let note =   await Note.findById(req.params.id);
    if(!note){
        return res.status(401).send("Not Found");
    }
    if(note.user.toString() !== req.user.id ){
        return res.status(401).send("Not Allowed");
    }

    note  = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success" : "Note has been deleted", note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Occured");
}

})

module.exports = router