//Mock middleware to attach current userId
async function mockMiddleware(req, res, next) {
  req.user = {
    userId: "a75754a4-e35e-11f1-bc24-2a30f3d0139a",
  };

  next();
}

module.exports = { mockMiddleware };
