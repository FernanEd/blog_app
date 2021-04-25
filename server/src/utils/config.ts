import dotenv from "dotenv";

dotenv.config();

const CONNECTION_URI = process.env.CONNECTION_URI || "";
const PORT = process.env.PORT || 4001;
const SECRETS = {
  jwt: process.env.JWT_SECRET || "secret",
  jwtExp: "6h",
};

export default { CONNECTION_URI, PORT, SECRETS };
