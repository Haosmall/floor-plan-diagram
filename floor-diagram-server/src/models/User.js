// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const { ROLE } = require("../utils/constants");
// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       min: 6,
//       max: 255,
//     },
//     username: {
//       type: String,
//       required: true,
//       min: 6,
//       max: 225,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 6,
//       max: 255,
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(user.password, 8);
//   next();
// });

// userSchema.statics.findByCredentials = async (username, password) => {
//   const user = await User.findOne({
//     username,
//   });
//   if (!user) throw new Error("User not found");

//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) throw new Error("Password invalid");

//   return user;
// };

// userSchema.statics.isAdmin = async (userId) => {
//   const { isAdmin } = await User.findById(userId);
//   return isAdmin;
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;
