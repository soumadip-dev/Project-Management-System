import { ApiResponse } from '../utils/api-response.js';

const healthCheck = function (req, res) {
  console.log();
  res.status(200).json(new ApiResponse(200, { message: 'Surver is Running' }));
};
export { healthCheck };
