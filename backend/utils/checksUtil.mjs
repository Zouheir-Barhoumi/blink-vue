import mongoose from "mongoose";
const NotEmpty = (value) =>
  value !== undefined && value !== null && value.trim() !== "";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export { NotEmpty, isValidObjectId };
