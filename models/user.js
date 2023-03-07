import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    name: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    photoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);
export const User = model("User", userSchema);
