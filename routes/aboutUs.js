const AboutUs = require("../models/AboutUs");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newAboutUs = new AboutUs(req.body);

  try {
    const savedAboutUs = await newAboutUs.save();
    res.status(200).json(savedAboutUs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    // const updatedAboutUs = await AboutUs.findById(req.params.id);
    // updatedAboutUs.set(req.body);
    // await updatedAboutUs.save();
    const updatedAboutUs = await AboutUs.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAboutUs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.status(200).json(aboutUs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
