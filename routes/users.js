const express = require('express')

const router = express.Router()


const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

router.post(
  "/",
  asyncHandler(async (req, res, next) => {
      console.log("hello user")
//     const { fullName, email, password } = req.body; //
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       fullName,
//       email,
//       cashBalance,
//       hashedPassword,
//     });


//     const token = getUserToken(user);
//     res
//       .status(201)
//       .json({ token, user: { id: user.id, cashBalance: user.cashBalance } });
   })
);

module.exports = router;
