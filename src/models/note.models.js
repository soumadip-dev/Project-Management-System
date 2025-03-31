// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';

// DEFINE NOTE SCHEMA
const projectNoteSchema = new Schema(
  {
    prject: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true },
);

// CREATE AND EXPORT NOTE MODEL
export const ProjectNote = mongoose.model('ProjectNote', projectNoteSchema);
