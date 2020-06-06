const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require("../db/models");
const { getUserToken } = require("../auth");

const router = express.Router()


const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

//CREATE BEW USER ROUTE
router.post(
  "/",
  asyncHandler(async (req, res, next) => {    
    const { userName, email, password, avatar } = req.body; //
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, hashedPassword, avatar });

    console.log(`User: ${userName} created with Avatar #${avatar}`);
    const token = getUserToken(user);
    res
      .status(201)
      .json({ token, user: { id: user.id, userName } });
   })
);

//USER LOGIN ROUTE


module.exports = router;
