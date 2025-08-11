import { Request, Response, NextFunction } from "express";
import { backendAnalytics } from "../util/backendAnalytics";

// Analytics middleware to track API requests
export const analyticsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const userId = (req as any).user?.uid; // Assuming user is attached by auth middleware

  // Log API request
  backendAnalytics.logApiRequest(req.path, req.method, userId);

  // Override res.end to capture response time
  const originalEnd = res.end;
  res.end = function (chunk?: any, encoding?: any): any {
    const responseTime = Date.now() - startTime;

    // Log API request with response time
    backendAnalytics.logApiRequest(req.path, req.method, userId, responseTime);

    // Log errors if status code indicates error
    if (res.statusCode >= 400) {
      backendAnalytics.logApiError(
        req.path,
        req.method,
        res.statusCode,
        `HTTP ${res.statusCode}`,
        userId
      );
    }

    originalEnd.call(this, chunk, encoding);
  };

  next();
};
