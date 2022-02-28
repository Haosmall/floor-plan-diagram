const jwt = require("jsonwebtoken");

const tokenUtils = {
  generateToken: async (data) => {
    const JWT_KEY = process.env.JWT_KEY || "YourKey";
    const JWT_LIFE_ACCESS_TOKEN = process.env.JWT_LIFE_ACCESS_TOKEN || "3d";
    if (!data) return null;
    return await jwt.sign({ ...data, createdAt: new Date() }, JWT_KEY, {
      expiresIn: JWT_LIFE_ACCESS_TOKEN,
    });
  },

  verifyToken: async (token) => {
    if (!token) return new Error("Token invalid");
    const JWT_KEY = process.env.JWT_KEY || "YourKey";
    return await jwt.verify(token, JWT_KEY);
  },
};

module.exports = tokenUtils;
