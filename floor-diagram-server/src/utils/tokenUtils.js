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

  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_KEY || "YourKey", (err, decode) => {
        if (err) {
          reject("Invalid token");
          return;
        }
        resolve(decode);
      });
    });
  },
};

module.exports = tokenUtils;
