import { Schema, model, Types } from "mongoose";

interface Image {
  image_url: string;
  label: string;
  user: Types.ObjectId;
}

const imageSchema = new Schema<Image>({
  image_url: { type: String, required: true, unique: false },
  label: { type: String, required: true, unique: false },
  user: { required: true, type: Schema.Types.ObjectId, ref: "user" }, //Definir quien creo el hospital
});

imageSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.uid = _id;
  return object;
});

export = model("image", imageSchema);
