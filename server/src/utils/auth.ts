import config from "./config";
import jwt from "jsonwebtoken";
import { Handler } from "express";
import User, { IUser } from "../resources/user/user.model";
import bcrypt from "bcryptjs";

export const newToken = (usuario: IUser) => {
  return jwt.sign({ id: usuario._id }, config.SECRETS.jwt, {
    expiresIn: config.SECRETS.jwtExp,
  });
};

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRETS.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signin: Handler = async (req, res) => {
  const invalid = { auth: false, message: "Incorrect username or password" };

  try {
    const user = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({ auth: true, token, user: user._id });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect: Handler = async (req, res, next) => {
  console.log(req.headers.authorization);
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();

  let payload: any;
  try {
    payload = (await verifyToken(token)) || { id: null };
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id).lean().exec();

  if (!user) {
    return res.status(401).end();
  }

  req.currentUser = user;
  next();
};

export const verify: Handler = async (req, res) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();

  jwt.verify(token, config.SECRETS.jwt, (err, payload) => {
    if (err) return res.status(401).end();

    res.status(200).end();
  });

  res.status(401).end();
};
