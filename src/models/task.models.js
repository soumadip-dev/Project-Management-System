// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';
import { AvailableTaskStatuses, TaskStatusEnum } from '../utils/constants.js';

// DEFINE TASK SCHEMA
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project ref is required'],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatuses,
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          filename: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// CREATE AND EXPORT TASK MODEL
export const Task = mongoose.model('Task', taskSchema);
