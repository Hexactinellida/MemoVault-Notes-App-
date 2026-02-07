import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ""
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastEdited: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update lastEdited on every save
noteSchema.pre('save', function(next) {
  this.lastEdited = Date.now();
  next();
});

// Middleware to update lastEdited on findOneAndUpdate
noteSchema.pre('findOneAndUpdate', function(next) {
  this.set({ lastEdited: Date.now() });
  next();
});

const noteModel = mongoose.models.note || mongoose.model('note', noteSchema);

export default noteModel;