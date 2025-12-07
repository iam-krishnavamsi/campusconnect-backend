const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User, College } = require("../models");

router.post("/login", async (req, res) => {
  try {
    const { name, collegeCode } = req.body;
    if (!name || !collegeCode)
      return res.status(400).json({ error: "name and collegeCode required" });

    let college = await College.findOne({ where: { code: collegeCode } });
    if (!college) return res.status(400).json({ error: "Invalid college code" });

    let user = await User.findOne({
      where: { name, CollegeId: college.id },
    });

    if (!user) {
      user = await User.create({
        name,
        CollegeId: college.id,
      });
    }

    const token = jwt.sign(
      { userId: user.id, collegeId: college.id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, college: college.name, collegeId: college.id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
