const User = require("../models/user");

exports.signup = (req, res) => {
  if( req.body ) {
    console.log(`req.body1: ${req}`);
  }
  console.log("req.body2: ", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error
      });
    } else {
      res.json({
        user
      });
    }
  });
};
