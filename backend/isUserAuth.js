const { getUser } = require("./token");

function isUserAuth(req, res, next) {
  const token = req.cookies?.uid;
  const Auth = getUser(token);

  return Auth ? next() : res.status(401).send("Unauthorized");
}

module.exports = { isUserAuth: isUserAuth };
