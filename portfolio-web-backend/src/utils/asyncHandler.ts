import { Request, Response, NextFunction } from 'express';

// Takes async function as fn, wraps in a Promise ,
// and catches error and pass to next() (which will go to error handler middleware)
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
