// /backend/models/Lesson.js

const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  _id: {
    type: String,
    required: true
  },
  words: [
    {
      word_id: {
        type: String,
        required: true
      },
      english: {
        type: String,
        required: true
      },
      ilonggo: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Lesson', LessonSchema);
