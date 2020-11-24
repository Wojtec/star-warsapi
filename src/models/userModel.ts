import { Schema, model, Document } from "mongoose"; // Import classes from mongoose.

// User object interface, extends methods from Document class.
export interface UserInterface extends Document {
  email: string;
  password: string;
  hero: object | undefined;
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

export default model<UserInterface>("User", userSchema);
