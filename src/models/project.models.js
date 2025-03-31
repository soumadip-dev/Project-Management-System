// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';

// DEFINE PROJECT SCHEMA
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createrdBy: {
      type: Schema.Type.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timeStamp: true },
);

// CREATE AND EXPORT PROJECT MODEL
export const Project = mongoose.model('Project', projectSchema);
