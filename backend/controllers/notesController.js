const User = require('../models/User');
const Note = require('../models/Note');
const bcrypt = require('bcrypt');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = async (req, res) => {
  let notes = await Note.find().lean();

  if (notes) {
    notes = await Promise.all(
        notes.map(async (note, index) => {
          const user = await User.findById(note.user).lean();
          if (user) {
            note.username = user.username;
          } else {
            note.username = 'Uknown'
          }
          return note;
        })
    );
  }

  if (!notes?.length) {
    return res.status(400).json({ message: 'No notes found' });
  }
  res.json(notes);
};

// @desc Create note
// @route POST /notes
// @access Private
const createNote = async (req, res) => {
  const { userid, title, text, completed } = req.body;

  // Confirm data
  if (!userid || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const user = await User.findById(userid).lean();

  if (!user) {
    return res.status(400).json({ message: 'Invalid users id' });
  }

  const duplicateNote = await Note.findOne({
    user: user,
    title: title,
  }).collation({locale:'en',strength:2})
    .lean()
    .exec();

  if (duplicateNote) {
    return res
      .status(409)
      .json({ message: 'Duplicate Note! This note already exists' });
  }

  const noteObject = { user: user, title, text, completed };

  const note = await Note.create(noteObject);

  if (note) {
    res
      .status(201)
      .json({ message: `New note was created for user ${user.username}` });
  } else {
    res.status(400).json({ message: 'Invalid note data recived' });
  }
}

// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = async (req, res) => {
  const { id, title, text, completed } = req.body;

  // Confirm data
  if (!id || !title || !text || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'All fileds are required' });
  }

  const note = await Note.findOne({ _id: id }).collation({locale:'en',strength:2}).exec();

  if (!note) {
    return res.status(400).json({ message: 'Note not found' });
  }

  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  const user = await User.findById(updatedNote.user);

  res.json({
    message: `User: ${user.username} has updated a note with id: ${note.id}.`,
  });
}

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = async (req, res) => {
  const { id, userId  } = req.body;

  if (!id || !userId) {
    return res.status(400).json({ message: 'id and userId required' });
  }

  const note = await Note.findOne({ _id: id, user:userId }).collation({locale:'en',strength:2}).exec();
  console.log('DELETE NOTE',note)
  if (!note) {
    return res.status(400).json({ message: 'User has no assigned notes.' });
  }

 const user = await User.findOne({_id:userId }).lean().exec()
  console.log('DELETE NOTE USER',user)

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const result = await Note.findOneAndDelete({_id: id , user: userId});
  console.log('RESULT',result)
  const reply = `User ${user.username} deleted note with ID ${id}`;

  res.json(reply);


}

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
};
