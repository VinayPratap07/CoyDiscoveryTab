async function getProfiles(req, res) {
  return res.status(200).json({ msg: req.user });
}

module.exports = { getProfiles };
