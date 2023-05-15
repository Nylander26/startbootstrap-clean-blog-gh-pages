const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is mandatory"],
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = model("user", userSchema);
