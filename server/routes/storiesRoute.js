const router = require("express").Router();
const Story = require("../models/Story");

router.get("/home", (req, res) => {
  res.send("homepage");
});

router.get("/", async (req, res) => {
  try {
    const allStory = await Story.find();
    res.status(200).json(allStory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const singleStory = await Story.findById(id);
    res.status(200).json(singleStory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  const newStory = new Story(req.body);
  try {
    const savedStory = await newStory.save();
    res.status(200).json(savedStory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const singleStory = await Story.findById(id);

    try {
      const updatedStory = await Story.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedStory);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const singleStory = await Story.findById(id);
    await singleStory.delete();
    res.status(200).json("post has been deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
