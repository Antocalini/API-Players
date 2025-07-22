import AppError from "../utils/appError.js"; // <--- IMPORT AppError

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes (in development)
  console.error(err.stack);

  // Initialize statusCode and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Error interno del servidor";

  // --- Handle specific operational errors ---

  // 1. Handle our custom AppErrors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  
  // 2. Mongoose Validation Errors
  if (err.name === "ValidationError") {
    // Mongoose validation errors often contain multiple error messages
    const errors = Object.values(err.errors).map((el) => el.message);
    statusCode = 400; // Bad Request
    message = `Datos de entrada inválidos: ${errors.join('. ')}`;
  }

  // 3. Duplicate Key Errors (e.g., trying to register with an existing email)
  if (err.code === 11000) { // MongoDB duplicate key error code
    const value = err.keyValue ? Object.keys(err.keyValue)[0] : 'un campo';
    statusCode = 400;
    message = `El valor '${err.keyValue[value]}' para ${value} ya existe. Por favor, usa otro.`;
  }

  // 4. Invalid Mongoose ID (e.g., GET /api/players/1234 invalid id format)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = `ID inválido: ${err.value}.`;
  }

  // 5. JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401; // Unauthorized
    message = "Token inválido. Por favor, inicia sesión de nuevo.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401; // Unauthorized
    message = "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.";
  }

  // --- Send the response ---
  res.status(statusCode).json({
    status: err.status || (statusCode >= 400 && statusCode < 500 ? 'fail' : 'error'),
    message: message,
    // In development, you might want to send the full error object or stack
    // if (process.env.NODE_ENV === 'development') {
    //   response.error = err;
    //   response.stack = err.stack;
    // }
  });
};

export default errorHandler;