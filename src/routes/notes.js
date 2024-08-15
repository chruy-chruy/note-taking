const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = new Note({
      title,
      content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error creating note', error });
  }
});

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving notes', error });
  }
});

// Get a specific note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving note', error });
  }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(400).json({ message: 'Error updating note', error });
  }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting note', error });
  }
});

module.exports = router;
