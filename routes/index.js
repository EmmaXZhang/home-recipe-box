var express = require("express");
var router = express.Router();
const passport = require("passport");
const recipesController = require("../controllers/recipes");

/* GET home page. */
router.get("/", recipesController.homePage);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    // Requesting the user's profile and email
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect("/");
  });
});

module.exports = router;
