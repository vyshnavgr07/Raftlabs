export const AppError = (message, statusCode = 500, errors = []) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  error.isOperational = true;
  return error;
};
