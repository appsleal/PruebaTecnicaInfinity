const { Router } = require("express");
const router = Router();
const User = require("../models/user.model");
const userRegisterValidator = require("../validators/userRegister.validator");
const userLoginValidator = require("../validators/userLogin.validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require("dotenv").config();

router.post("/create", async (req, res) => {
  const numberExist = await User.findOne(
    { mobile_phone: req.body.mobile_phone },
    { token: 0 }
  );
  if (numberExist) {
    return res.status(200).json({
      ok: false,
      data: null,
      error: "numero de telefono ya registrado",
    });
  }

  const isEmailExist = await User.findOne(
    { email: req.body.email },
    { token: 0 }
  );
  if (isEmailExist) {
    return res.status(200).json({
      ok: false,
      data: null,
      error: "Email ya registrado",
    });
  }
  const { error } = userRegisterValidator.validate(req.body);
  if (error) {
    return res.status(400).json({
      ok: false,
      data: null,
      error: error.details[0].message,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_birth: Date(req.body.date_birth),
    address: req.body.address,
    token: req.body.token,
    password: password,
    mobile_phone: req.body.mobile_phone,
    email: req.body.email,
  });

  try {
    const savedUser = await user.save();
    res.json({
      ok: true,
      data: savedUser,
      error: null,
    });
  } catch (error) {
    res.status(400).json({
      ok: true,
      data: null,
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  const { error } = userLoginValidator.validate(req.body);
  if (error) {
    return res.status(400).json({
      ok: false,
      data: null,
      error: error.details[0].message,
    });
  }
  const user = await User.findOne({ mobile_phone: req.body.mobile_phone });
  if (!user) {
    return res.status(401).json({
      ok: false,
      data: null,
      error: "Telefono/Password invalido",
    });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      data: null,
      error: "Telefono/Password invalido",
    });
  }

  const token = jwt.sign(
    {
      name: user.first_name,
      id: user._id,
    },
    process.env.TOKEN_SECRET
  );
  user.token = token;
  user.save();

  res.json({
    ok: true,
    data: {
      user,
      access_token: token,
      token_type: "bearer",
    },
    error: null,
  });
});

router.get("/users", async (req, res) => {

});

module.exports = router;
