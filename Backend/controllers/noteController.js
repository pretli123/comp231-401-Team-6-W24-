const Notes = require("../models/noteModel.js");
const router = express.Router();
const { createNote } = require("../controllers/noteController.js");


router.post('/notes', createNote);

const createNote = async (req, res) => {
  try {
    const { title, content, username } = req.body;
    const newNote = new Notes({
      title,
      content,
      username
    });
    await newNote.save();
   res.status(201).json({message: "Note Saved"});
} catch (error) {
  console.log(error);
  res.status(500).json({error: "Note Not Saved"});
}
};

module.exports = {
  createNote
}