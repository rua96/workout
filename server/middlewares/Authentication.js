const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const authToken = req.header("authToken");

  if (!authToken) {
    return res.json({ error: "User is Not Logged In ! " });
  }

  try {
    const validToken = verify(authToken, process.env.AUTH_SECRET);

    if (validToken) {
      req.user = validToken;
      next();
    }
  } catch (e) {
    return res.json({ error: e });
  }
};

module.exports = { validateToken };
