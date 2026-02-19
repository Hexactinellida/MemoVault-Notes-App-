import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  images: { type: [imageSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  lastEdited: { type: Date, default: Date.now }
});

noteSchema.pre('save', function() {
  this.lastEdited = Date.now();
});

noteSchema.pre('findOneAndUpdate', function() {
  this.set({ lastEdited: Date.now() });
});

const noteModel = mongoose.models.note || mongoose.model('note', noteSchema);

export default noteModel;