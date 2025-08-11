import { Request, Response, NextFunction } from "express";
import { apiResponse } from "../util/apiResponse";
import logger from "../util/logger";

// Custom error class for API errors
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Global error handling middleware
export const errorHandler = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";

  // Handle custom API errors
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    // Handle other types of errors
    if (error.name === "ValidationError") {
      statusCode = 422;
      message = "Validation failed";
    } else if (error.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID format";
    } else if (error.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid token";
    } else if (error.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Token expired";
    } else if (error.name === "MongoError" || error.name === "MongoServerError") {
      if ((error as any).code === 11000) {
        statusCode = 409;
        message = "Duplicate field value";
      }
    }
  }

  // Log error
  logger.error(`Error ${statusCode}: ${message}`, {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Send error response
  return apiResponse.error(res, message, statusCode);
};

// Async error wrapper to catch async errors
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 404 handler for undefined routes
export const notFoundHandler = (req: Request, res: Response) => {
  return apiResponse.notFound(res, `Route ${req.originalUrl} not found`);
};
