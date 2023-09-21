const router = require("express").Router();
const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sandVerificationMail } = require("../utils/sandVerificationMail");

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SEC;

  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    emailToken: crypto.randomBytes(64).toString("hex"),
  });

  try {
    const savedUser = await newUser.save();
    sandVerificationMail(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    //res.status(500).json(err);
    console.log(err);
  }
});
// verifyEmail

router.post("/verifyemail", async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status.json("Email not found...");

    const user = await User.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;

      await user.save();
      // const token = createToken(user._id);

      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        // token,
        isVerified: user?.isVerified,
      });
    } else {
      res.status(404).json("email verification failed, invalid toklen!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Resend verifyEmail

router.post("/resendverifyemail/:id", async (req, res) => {
  try {
    const newUser = await User.findById(req.params.id);
    sandVerificationMail(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
