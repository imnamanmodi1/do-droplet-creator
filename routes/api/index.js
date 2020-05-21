var express = require("express");
var router = express.Router();
const DigitalOcean = require("do-wrapper").default;

//get DO_TOKEN
var DO_API_TOKEN = process.env.DO_API_TOKEN;
// initialising DO API TOKEN
const instance = new DigitalOcean("");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ success: true, message: "Welcome to Node APIs" });
});

router.get("/retrieve-all-droplets", (req, res, next) => {
  instance.droplets
    .getAll()
    .then((data) => res.json(data.droplets))
    .catch((err) => console.error(err));
});

router.post("/create-droplet", (req, res, next) => {
  var dropletOptions = {
    name: req.body.name,
    region: req.body.region,
    size: req.body.size,
    image: req.body.image,
  };
  instance.droplets
    .create(dropletOptions)
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

router.get("/list-regions", (req, res, next) => {
  instance.regions
    .getAll()
    .then((data) => res.json(data))
    .catch((err) => console.error(err));
});

module.exports = router;
