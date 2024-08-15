const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { verifyToken } = require('../middleware/auth');


// Create a new note
router.post('/', verifyToken, async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note', error: err });
  }
});

// Retrieve all notes
router.get('/', verifyToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving notes', error: err });
  }
});

// Retrieve a specific note
router.get('/:noteId', verifyToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this note' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving note', error: err });
  }
});

// Update a note
router.put('/:noteId', verifyToken, async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }
    note.title = req.body.title;
    note.content = req.body.content;
    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err });
  }
});

// Delete a specific note by ID
router.delete('/:noteId', verifyToken, async (req, res) => {
  try {
    const noteId = req.params.noteId;

    // Check if the note exists and belongs to the authenticated user
    const note = await Note.findOne({ _id: noteId, user: req.user._id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found or you do not have permission to delete it.' });
    }

    // Delete the note
    await Note.deleteOne({ _id: noteId });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'An error occurred while deleting the note', error: err.message });
  }
});

module.exports = router;
