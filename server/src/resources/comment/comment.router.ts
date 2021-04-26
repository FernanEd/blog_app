import { Router } from "express";
import controller from "./comment.controllers";

const router = Router();

router.route("/post/:id").get(controller.getCommentsOfPost);

router.route("/").get(controller.getMany).post(controller.createOne);

router
  .route("/:id")
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
