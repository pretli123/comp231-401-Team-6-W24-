const express = require('express');
const router = express.Router();
const Notes = require("../models/noteModel.js");

// Route to create a new note
router.post('/notes', async (req, res) => {

    const creatingNotes = new Notes({
        title: req.body.title,
        content: req.body.title
    })
    creatingNotes.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error=>{
        res.json(error)
    })
});

router.get('/notes', async (req, res) => {
    try {
        const allNotes = await Notes.find();
        res.json(allNotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

    
 module.exports = router;    
