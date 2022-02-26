import { Schema, model } from "mongoose";

interface User {
  email: string;
  password: string;
}

const UsuarioSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UsuarioSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.uid = _id;
  return object;
});

export = model("User", UsuarioSchema);
