// IMPORTING MODULES
import mongoose, { Schema } from 'mongoose';
import { AvailableUserRoles, UserRolesEnum } from '../utils/constants.js';

// DEFINE PROJECT MEMBER SCHEMA
const projectmemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.MEMBER,
    },
  },
  {
    timestamps: true,
  },
);

// CREATE AND EXPORT PROJECT MEMBER MODEL
export const ProjectMember = mongoose.model(
  'ProjectMember',
  projectmemberSchema,
);
