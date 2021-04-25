// import config from "./config";
// import jwt from "jsonwebtoken";
// import { Handler } from "express";
// import User, { IUser } from "../resources/user/user.model";

// export const newToken = (usuario: IUser) => {
//   return jwt.sign({ id: usuario._id }, config.SECRETS.jwt, {
//     expiresIn: config.SECRETS.jwtExp,
//   });
// };

// export const verifyToken = (token: string) =>
//   new Promise((resolve, reject) => {
//     jwt.verify(token, config.SECRETS.jwt, (err, payload) => {
//       if (err) return reject(err);
//       resolve(payload);
//     });
//   });

// export const signin: Handler = async (req, res) => {
//   const invalid = { auth: false, message: "Matricula o clave no existe" };

//   try {
//     const user = await User.findOne({
//       matricula: req.body.matricula,
//     }).exec();

//     if (!user) {
//       return res.status(401).send(invalid);
//     }

//     const match = await user.checkPassword(req.body.clave);

//     if (!match) {
//       return res.status(401).send(invalid);
//     }

//     if (!user.roles.includes("admin")) {
//       return res.status(401).send({
//         ...invalid,
//         message: "Este usuario no tiene permiso de acceder",
//       });
//     }

//     const token = newToken(user);
//     return res.status(201).send({ auth: true, token, user: user._id });
//   } catch (e) {
//     console.error(e);
//     res.status(500).end();
//   }
// };

// export const protect: Handler = async (req, res, next) => {
//   const bearer = req.headers.authorization;

//   if (!bearer || !bearer.startsWith("Bearer ")) {
//     return res.status(401).end();
//   }

//   const token = bearer.split("Bearer ")[1].trim();

//   let payload: any;
//   try {
//     payload = (await verifyToken(token)) || { id: null };
//   } catch (e) {
//     return res.status(401).end();
//   }

//   const user = await Usuario.findById(payload.id)
//     .select("-clave")
//     .lean()
//     .exec();

//   if (!user) {
//     return res.status(401).end();
//   }

//   req.currentUser = user;
//   next();
// };

// export const verify: Handler = async (req, res) => {
//   const bearer = req.headers.authorization;

//   if (!bearer || !bearer.startsWith("Bearer ")) {
//     return res.status(401).end();
//   }

//   const token = bearer.split("Bearer ")[1].trim();

//   jwt.verify(token, config.SECRETS.jwt, (err, payload) => {
//     if (err) return res.status(401).end();

//     res.status(200).end();
//   });

//   res.status(401).end();
// };
