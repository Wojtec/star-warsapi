import { Schema, model, Document } from "mongoose"; // Import classes from mongoose.
import bcrypt from "bcrypt"; // Import bcrypt for encrypt password.

/**
 *
 * MONGODB SCHEMA
 * encryptPassword
 * validatePassword
 * */

// User object interface, extends methods from Document class.
export interface UserInterface extends Document {
  email: string;
  password: string;
  hero: object | undefined;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}
// New user schema object.
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hero: {
    type: Object,
    required: true,
  },
});

//Encrypt password
userSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  // saltRounds to calculate a single bcrypt hash.
  const saltRounds = 10;
  // Calculate hash
  const salt = await bcrypt.genSalt(saltRounds);
  // Return encrypted password.
  return await bcrypt.hash(password, salt);
};

//Validate password
userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  // Compare password from request with user password.
  return await bcrypt.compare(password, this.password);
};

export default model<UserInterface>("User", userSchema);
