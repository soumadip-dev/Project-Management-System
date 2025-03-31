// CREATING ASYNC HANDLER FUNCTION
function asyncHandler(requestHandler) {
  return function (req, res, next) {
    // ENSURING REQUEST HANDLER IS A PROMISE
    Promise.resolve(requestHandler(req, res, next)).catch(function (error) {
      // PASSING ERROR TO NEXT MIDDLEWARE
      next(error);
    });
  };
}

// EXPORTING ASYNC HANDLER
export { asyncHandler };
