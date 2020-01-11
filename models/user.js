const mongoose = require("mongoose");
//module that hashes password (when user enters password the system saves a hashed version of the password)
const crypto = require("crypto");
//uuid : package for unique strings
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
    },
    hashed_password: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32
    },
    about: {
      type: String,
      trim: true
    },
    salt: String, //generates the hashed password
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

//virtual field
userSchema
  .virtual("password")
  .set(password => {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);