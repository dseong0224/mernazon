exports.userSignupValidator = (req, res, next) => {
  //validate name
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 2 to 32 characters")
    .matches(/.+@.+\..+/)
    .withMessage("Email must contain @")
    .islength({
      min: 4,
      max: 32
    });
  //validate email
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .islength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
