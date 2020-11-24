import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generate tokens.
import config from "../config"; // Import config with process environments.

/**
 *
 * VERIFY TOKEN MIDDLEWARE
 * verifyToken
 *
 * */

// Payload object interface for verifyToken.
interface PayloadInterface {
  _id: string;
  iat: number;
  exp: number;
}

//Verify token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get bearer token form req headers.
  const bearerHeader: string | undefined = req.headers.authorization;
  // Separate bearer from token.
  const token: string | undefined = bearerHeader && bearerHeader.split(" ")[1];
  // Check if is token.
  if (!token) return res.status(401).send({ message: "Unauthorized" });
  // Verify token by jwt method.
  const payload = jwt.verify(token, config.secret) as PayloadInterface;
  // Set user id in req object.
  req.userId = payload._id;
  // Call next function.
  next();
};
