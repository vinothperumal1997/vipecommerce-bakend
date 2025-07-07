const {
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiry,
} = require("../config/jwt");
const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    const refreshToken = req.cookies?.refresh_token;

    if (!token) {
      return res.status(401).json({
        message: "Please login.....",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        // Check if the token expired
        if (err.name === "TokenExpiredError") {
          if (!refreshToken) {
            return res.status(403).json({
              message: "Refresh token required.",
              error: true,
              success: false,
            });
          }

          // Verify the refresh token
          jwt.verify(
            refreshToken,
            refreshTokenSecret,
            (refreshErr, refreshDecoded) => {
              if (refreshErr) {
                return res.status(403).json({
                  message: "Invalid refresh token.",
                  error: true,
                  success: false,
                });
              }

              // Generate a new access token
              const newAccessToken = jwt.sign(
                { id: refreshDecoded.id },
                accessTokenSecret,
                { expiresIn: accessTokenExpiry }
              );

              // Update token cookies
              res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: true,
              });

              // Pass user information
              req.userId = refreshDecoded.id;
              return next();
            }
          );
        } else {
          return res.status(400).json({
            message: err.message || "Token verification error.",
            error: true,
            success: false,
          });
        }
      } else {
        req.userId = decoded?.id;
        return next();
      }
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Server error.",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
