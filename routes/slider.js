const Slider = require("../models/Slider");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newSlider = new Slider(req.body);

  try {
    const savedSlider = await newSlider.save();
    res.status(200).json(savedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json("Slider has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Slider
router.get("/find/:id", async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SLIDERS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
