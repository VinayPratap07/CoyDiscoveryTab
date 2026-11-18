//Mock middleware to attach current userId
async function mockMiddleware(req, res, next) {
  req.user = {
    userId: "aefc549f-e35d-11f1-bc24-2a30f3d0139a",
  };

  next();
}

module.exports = { mockMiddleware };
