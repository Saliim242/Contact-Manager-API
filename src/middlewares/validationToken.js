const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async (req, res, next) => {
  if (req.headers.Authorization || req.headers.authorization == undefined) {
    res.status(403);
    throw new Error("No Token Provided ");
  }
  let token;
  const authHeaderToken =
    req.headers.Authorization || req.headers.authorization;
  if (authHeaderToken && authHeaderToken.startsWith("Bearer")) {
    token = authHeaderToken.split(" ")[1];

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not Authorized");
      }

      req.user = decoded.user;
      // Continue to the next middleware or route handler
      next();
    });
    // If no token is provided, return an error
    if (!token) {
      res.status(403);
      throw new Error("User is not Authorized or token messing in the request");
    }
  }
});

module.exports = validateToken;
