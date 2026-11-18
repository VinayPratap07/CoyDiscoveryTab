const { Router } = require("express");
const { getMatches } = require("../Controller/Matches_Controller");

const route = Router();

route.get("/", getMatches);

module.exports = route;
