// ENUM FOR USER ROLES
export const UserRolesEnum = {
  ADMIN: 'admin',
  PROJECT_ADMIN: 'project_admin',
  MEMBER: 'member',
};

// ARRAY OF AVAILABLE USER ROLES
export const AvailableUserRoles = Object.values(UserRolesEnum);

// ENUM FOR TASK STATUSES
export const TaskStatusEnum = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

// ARRAY OF AVAILABLE TASK STATUSES
export const AvailableTaskStatuses = Object.values(TaskStatusEnum);
