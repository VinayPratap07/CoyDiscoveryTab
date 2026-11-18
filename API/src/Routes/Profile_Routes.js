const { Router } = require("express");
const { getProfiles } = require("../Controller/Profile_Controller");

const route = Router();

route.get("/", getProfiles);

module.exports = route;
