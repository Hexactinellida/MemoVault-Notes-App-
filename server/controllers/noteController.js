import noteModel from "../models/noteModel.js";

// Create new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.body.userId; // from userAuth middleware

    const note = await noteModel.create({
      title,
      content: content || "",
      userId // if you want to link notes to users
    });

    res.json({ success: true, note });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all notes for user
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.body.userId;
    const notes = await noteModel.find({ userId }).sort({ lastEdited: -1 });

    res.json({ success: true, notes });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get single note
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);

    if (!note) {
      return res.json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await noteModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // return updated document
    );

    if (!note) {
      return res.json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, note });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete note
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findByIdAndDelete(id);

    if (!note) {
      return res.json({ success: false, message: "Note not found" });
    }

    res.json({ success: true, message: "Note deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};