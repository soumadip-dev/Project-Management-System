class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = [], // ADDITIONAL ERROR DETAILS
    stack = '', // STACK TRACE IF AVAILABLE
  ) {
    super(message); // CALLING PARENT CLASS CONSTRUCTOR WITH MESSAGE
    this.statusCode = statusCode; // ASSIGNING STATUS CODE
    this.message = message; // ASSIGNING ERROR MESSAGE
    this.success = false; // SETTING SUCCESS FLAG TO FALSE
    this.errors = this.errors; // INCORRECTLY ASSIGNING UNDEFINED PROPERTY (SHOULD BE 'this.errors = errors;')

    if (stack) {
      this.stack = stack; // ASSIGNING STACK TRACE IF PROVIDED
    } else {
      Error.captureStackTrace(this, this.constructor); // CAPTURING STACK TRACE
    }
  }
}

export { ApiError }; // EXPORTING THE ApiError CLASS
