import { Response } from "express";

// Define the response types
export interface ApiResponse<T = any> {
  status: "success" | "fail";
  data: T | null;
  message: string;
}

export interface SuccessResponse<T = any> extends ApiResponse<T> {
  status: "success";
  data: T;
  message: string;
}

export interface ErrorResponse extends ApiResponse<null> {
  status: "fail";
  data: null;
  message: string;
}

// Response wrapper class
export class ApiResponseWrapper {
  /**
   * Send a success response
   * @param res Express response object
   * @param data Data to be sent
   * @param message Success message (optional)
   * @param statusCode HTTP status code (default: 200)
   */
  static success<T>(
    res: Response,
    data: T,
    message: string = "Success",
    statusCode: number = 200
  ): Response<SuccessResponse<T>> {
    const response: SuccessResponse<T> = {
      status: "success",
      data,
      message,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response
   * @param res Express response object
   * @param message Error message
   * @param statusCode HTTP status code (default: 400)
   */
  static error(
    res: Response,
    message: string,
    statusCode: number = 400
  ): Response<ErrorResponse> {
    const response: ErrorResponse = {
      status: "fail",
      data: null,
      message,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send a not found response
   * @param res Express response object
   * @param message Error message (optional)
   */
  static notFound(
    res: Response,
    message: string = "Resource not found"
  ): Response<ErrorResponse> {
    return this.error(res, message, 404);
  }

  /**
   * Send an unauthorized response
   * @param res Express response object
   * @param message Error message (optional)
   */
  static unauthorized(
    res: Response,
    message: string = "Unauthorized"
  ): Response<ErrorResponse> {
    return this.error(res, message, 401);
  }

  /**
   * Send a forbidden response
   * @param res Express response object
   * @param message Error message (optional)
   */
  static forbidden(
    res: Response,
    message: string = "Forbidden"
  ): Response<ErrorResponse> {
    return this.error(res, message, 403);
  }

  /**
   * Send a validation error response
   * @param res Express response object
   * @param message Error message (optional)
   */
  static validationError(
    res: Response,
    message: string = "Validation failed"
  ): Response<ErrorResponse> {
    return this.error(res, message, 422);
  }

  /**
   * Send an internal server error response
   * @param res Express response object
   * @param message Error message (optional)
   */
  static internalError(
    res: Response,
    message: string = "Internal server error"
  ): Response<ErrorResponse> {
    return this.error(res, message, 500);
  }

  /**
   * Send a created response
   * @param res Express response object
   * @param data Data to be sent
   * @param message Success message (optional)
   */
  static created<T>(
    res: Response,
    data: T,
    message: string = "Resource created successfully"
  ): Response<SuccessResponse<T>> {
    return this.success(res, data, message, 201);
  }

  /**
   * Send a no content response
   * @param res Express response object
   */
  static noContent(res: Response): Response {
    return res.status(204).send();
  }
}

// Export convenience functions for easier usage
export const apiResponse = {
  success: ApiResponseWrapper.success,
  error: ApiResponseWrapper.error,
  notFound: ApiResponseWrapper.notFound,
  unauthorized: ApiResponseWrapper.unauthorized,
  forbidden: ApiResponseWrapper.forbidden,
  validationError: ApiResponseWrapper.validationError,
  internalError: ApiResponseWrapper.internalError,
  created: ApiResponseWrapper.created,
  noContent: ApiResponseWrapper.noContent,
};

export default ApiResponseWrapper;
