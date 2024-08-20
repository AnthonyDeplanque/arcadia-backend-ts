import { Request, Response } from "express";

export const teapot = (req: Request, res: Response) => {
  res.status(418).json({ teapot: true });
};