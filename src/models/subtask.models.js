// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';

// DEFINE SUBTASK SCHEMA
const subtaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// CREATE AND EXPORT SUBTASK MODEL
export const SubTask = mongoose.model('SubTask', subtaskSchema);
