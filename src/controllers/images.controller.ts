import { Request, Response } from "express";
import Image from "../models/image"; //Importar Schema usuario

//==============================================================================
//======================== CREATE USER =========================================
const createImageUrl = async (req: Request, res: Response) => {
  const uid = req.uid;
  try {
    const imageUrl = new Image({ ...req.body, user: uid });
    const newImage = await imageUrl.save();

    res.json({ image: newImage });
  } catch (error) {
    return res.status(500).json({
      errors: ["Unexpected error... check logs: " + error],
    });
  }
};

//======================================================================================
//======================== GET IMAGE BY SEARCH =========================================
const getImagesBySearch = async (req: Request, res: Response) => {
  const { search } = req.query;
  const uid = req.uid;

  const rgx = RegExp(search as any, "i");
  try {
    if (search !== "") {
      let images = await Image.find({ label: rgx });
      return res.json({ images });
    }

    const images = await Image.find({ user: uid });
    return res.json({ images: images.reverse() });
  } catch (error) {
    return res.status(500).json({
      errors: ["Unexpected error... check logs: " + error],
    });
  }
};

//==============================================================================
//======================== GET ALL IMAGES OF USER ==============================
const getAllImages = async (req: Request, res: Response) => {
  const uid = req.uid;

  try {
    const images = await Image.find({ user: uid });
    return res.json({ results: images.reverse() });
  } catch (error) {
    return res.status(500).json({
      errors: ["Unexpected error... check logs: " + error],
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
      return res.json("Image deleted successfully");
    }

    return res.status(404).json({
      errors: ["The image does not exist"],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: ["Unexpected error... check logs: " + error] });
  }
};
export default { getAllImages, getImagesBySearch, createImageUrl, deleteImage };
