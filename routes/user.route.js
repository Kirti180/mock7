const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
userRouter.use(express.json());
// register
userRouter.post("/register", async (req, res) => {
  const {
    name,
    email,
    street,
    address,
    state,
    country,
    zipcode,
    password,
    city,
  } = req.body;
  try {
    const user = await userModel.find({ email });
    {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "something went wrong" });
        } else {
          const user = new userModel({
            name,
            email,
            street,
            address,
            state,
            country,
            zipcode,
            city,
            password: hash,
          });
          await user.save();
          res.send({ msg: "new user registered" });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// LOGIN

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userID: user[0]._id }, "kirti");
          res.send({ msg: "login done", token: token });
        } else {
          res.send({ data: "wrong" });
        }
      });
    } else {
      res.send({ data: "wrong credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});
// change password
userRouter.patch("/user/:id/reset", async (req, res) => {
  const payload = req.body;
  const Id = req.params.id;
  try {
    const pass = await userModel.findByIdAndUpdate({ _id: Id }, payload);
    res.send({ msg: "patch req done" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { userRouter };
