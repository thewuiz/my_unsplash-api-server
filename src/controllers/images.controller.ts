import { Request, Response } from "express";
import Image from "../models/image"; //Importar Schema usuario

//==============================================================================
//======================== CREATE USER =========================================
const createImageUrl = async (req: Request, res: Response) => {
  const uid = req.uid;
  try {
    const imageUrl = new Image({ ...req.body, user: uid });
    await imageUrl.save();

    res.json({ image: imageUrl });
  } catch (error) {
    return res.status(500).json({
      msg: "Unexpected error... check logs: " + error,
    });
  }
};

//==============================================================================
//======================== GET ALL IMAGES OF USER ==============================
const getImagesByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const images = await Image.find({ user: id });
    return res.json({ results: images });
  } catch (error) {
    return res.status(500).json({
      msg: "Unexpected error... check logs: " + error,
    });
  }
};

//==============================================================================
//======================== DELETE IMAGES BY ID =================================
const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const image_db = await Image.findById(id);
    if (image_db) {
      await Image.findByIdAndDelete(id);
      return res.json("image deleted successfully");
    }

    return res.status(404).json({
      ok: false,
      msg: "The image does not exist",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, msg: "Unexpected error... check logs " + error });
  }
};
export default { createImageUrl, getImagesByUserId, deleteImage };
