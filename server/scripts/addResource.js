const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const [, , resourceName, modelName] = argv;

if (argv.length !== 4) {
  console.log(
    "Invalid usage. Please execute the script in this way: node addResource.js [resource name] [modelName]"
  );
  return;
}

const folderDir = path.join(__dirname, `../src/resources/${resourceName}/`);

const folderExists = fs.existsSync(folderDir);

if (folderExists === false) {
  fs.mkdirSync(folderDir);
}

fs.writeFileSync(
  path.join(folderDir, `${resourceName}.controllers.ts`),
  `import controllers from "../../utils/genericControllers";
import ${modelName} from "./${resourceName}.model";

const controller = controllers(${modelName});

export default controller;`
);

fs.writeFileSync(
  path.join(folderDir, `${resourceName}.model.ts`),
  `import { Schema, model, Types, Document } from "mongoose";

export interface I${modelName} extends Document {
  name: string;
}

const ${modelName}Schema = new Schema({
  name: { type: String, required: true },
});

export default model<I${modelName}>("${modelName}", ${modelName}Schema);`
);

fs.writeFileSync(
  path.join(folderDir, `${resourceName}.router.ts`),
  `import { Router } from "express";
import controller from "./${resourceName}.controllers";

const router = Router();

router.route("/").get(controller.getMany).post(controller.createOne);

router
  .route("/:id")
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;`
);
