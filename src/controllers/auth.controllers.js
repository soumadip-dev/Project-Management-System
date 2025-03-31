// IMPORTING MODULES
import { asyncHandler } from '../utils/async-handler.js';

// CONTROLLER FOR REGISTERUSER
const registerUser = asyncHandler(async function (req, res) {
  // 1. Get data from body
  const { username, email, password, role } = req.body;
  // 2. Validate data
});

// EXPORTING CONTROLLER
export { registerUser };
