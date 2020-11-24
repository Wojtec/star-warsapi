import { Request, Response, NextFunction } from "express"; // Import interfaces from express.
import User, { UserInterface } from "../models/userModel"; // Import user model and interface from model folder.

/**
 *
 * AUTH CONTROLLER
 * generateAccessToken
 * signUp
 * signIn
 *
 * */

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
      // Encrypt and set password from the request.
      password: password,
      // Set hero from util class method getHero().
      hero: { a: 1 },
    });

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
