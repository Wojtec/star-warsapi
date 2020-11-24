import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import User, { UserInterface } from "../models/userModel"; // Import user model and interface from model folder.
import config from "../config"; // Import config with process environments.
import jwt from "jsonwebtoken"; // Import jsonwebtoken for generate tokens.
import { getHero } from "../utils/index"; // Import utils methods from utils folder.
/**
 *
 * AUTH CONTROLLER
 * generateAccessToken
 * signUp
 * signIn
 *
 * */

// Token object interface for token generation.
interface TokenInterface {
  token: string;
  type: string;
  expiresIn: number;
}

// Generate access token method with id parameter.
const generateAccessToken = (id: string): TokenInterface => {
  // Create expires token time in this case is 24 h 60 seconds * 60 minuts * 24 hours.
  const tokenExpires: number = 60 * 60 * 24;
  // Create a token from jwt.sign method with arguments id, secret and options like algorithm type and time expire.
  const token: string = jwt.sign({ _id: id }, config.secret, {
    algorithm: "HS256",
    expiresIn: tokenExpires,
  });
  // Return object with token, type of token, and time expire.
  return { token, type: "Bearer", expiresIn: tokenExpires };
};

// Register user method.
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block
  try {
    // Set variables from request body.
    const { email, password }: { email: string; password: string } = req.body;
    // Create new user object.
    const user: UserInterface = new User({
      // Set email from the request body into the email model database.
      email: email,
      // Set password from the request.
      password: password,
      // Set hero from util class method getHero().
      hero: await getHero(),
    });

    // Encrypt user password.
    user.password = await user.encryptPassword(user.password);

    // Check if the user exists by email.
    const checkUser = await User.findOne({ email: user.email });
    // If the user exists, response 409 conflict, send the message.
    if (checkUser)
      return res
        .status(409)
        .send({ message: "This address email already exists." });

    // Save model in database.
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    next(err);
  }
};

//Login user method.
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Try catch block
  try {
  } catch (err) {
    next(err);
  }
};
