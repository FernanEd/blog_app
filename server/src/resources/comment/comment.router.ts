import { Router } from "express";
import controller from "./comment.controllers";

import { protect } from "../../utils/auth";

const router = Router();

router.route("/post/:id").get(controller.getCommentsOfPost);

router.route("/").get(controller.getMany).post(controller.createOne);

router
  .route("/:id")
  .get(controller.getOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

export default router;
