import { Router } from "express";
import controller from "./user.controllers";

import { protect } from "../../utils/auth";

const router = Router();

router.route("/").get(controller.getMany).post(protect, controller.createOne);

router
  .route("/:id")
  .get(controller.getOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

export default router;
