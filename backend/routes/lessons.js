// /backend/routes/lessons.js

const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const auth = require('../middleware/auth');

// GET all lesson topics (protected route)
router.get('/topics', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find().select('_id topic'); // Ensure _id is included
    res.json(lessons);
    console.log(lessons)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET lesson details by ID (protected route)
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
