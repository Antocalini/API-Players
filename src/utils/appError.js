class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the error message

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 'fail' for 4xx, 'error' for 5xx
    this.isOperational = true; // Mark as an operational error

    // Capture the stack trace for better debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;