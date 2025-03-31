// IMPORTING MODULES
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';

// HEALTH CHECK CONTROLLER WRAPPED WITH asyncHandler
const healthCheck = asyncHandler(async function (req, res) {
  // SEND SUCCESS RESPONSE
  res.status(200).json(new ApiResponse(200, { message: 'SERVER IS RUNNING' }));
  console.log('🚀 HEALTH CHECK SUCCESSFUL');
});

// EXPORTING FUNCTION
export { healthCheck };
