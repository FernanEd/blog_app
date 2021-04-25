import mongoose from "mongoose";
import { Request, Response } from "express";

type Model = mongoose.Model<any>;

export interface Handler {
  (req: Request, res: Response): void;
}

// These controllers are based on Scott Moss´s API Design in Node.js, v3 course.
// Link here https://frontendmasters.com/courses/api-design-nodejs-v3/

export const getMany = (
  model: Model,
  populateFields?: string
): Handler => async (req, res) => {
  try {
    const docs = await model.find().lean().populate(populateFields).exec();
    res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const createOne = (
  model: Model,
  populateFields?: string
): Handler => async (req, res) => {
  try {
    const created = await model.create({ ...req.body });
    if (populateFields) await created.populate(populateFields).execPopulate();
    res.status(200).json(created);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const getOne = (
  model: Model,
  populateFields?: string
): Handler => async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await model.findById(id).lean().populate(populateFields).exec();

    if (!doc) {
      return res.status(404).end();
    }

    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateOne = (
  model: Model,
  populateFields?: string
): Handler => async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await model
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .lean()
      .populate(populateFields)
      .exec();

    if (!updated) {
      return res.status(404).end();
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteOne = (
  model: Model,
  populateFields?: string
): Handler => async (req, res) => {
  const { id } = req.params;
  try {
    const removed = await model.findByIdAndRemove(id).lean().exec();

    if (!removed) {
      return res.status(404).end();
    }

    res.status(200).json(removed);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export default (useWithModel: Model, populateFields?: string) => ({
  getMany: getMany(useWithModel, populateFields),
  createOne: createOne(useWithModel, populateFields),
  getOne: getOne(useWithModel, populateFields),
  updateOne: updateOne(useWithModel, populateFields),
  deleteOne: deleteOne(useWithModel, populateFields),
});
