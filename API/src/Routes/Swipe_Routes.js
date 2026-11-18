const { Router } = require("express");
const { swipeProfile } = require("../Controller/Swipe_Controller");

const route = Router();

route.post("/", swipeProfile);

module.exports = route;
