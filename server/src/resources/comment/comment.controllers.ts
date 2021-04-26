import { Handler } from "express";
import controllers from "../../utils/genericControllers";
import Comment from "./comment.model";

const controller = controllers(Comment);

export const getCommentsOfPost: Handler = async (req, res) => {
  const { id } = req.params;
  try {
    const docs = await Comment.find({ originalPost: id }).lean().exec();
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export default { ...controller, getCommentsOfPost };
