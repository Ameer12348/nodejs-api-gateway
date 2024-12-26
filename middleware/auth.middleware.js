const envVars = require("../configs/envVars");
const { admin } = require("../configs/firebase");
const axios = require("axios");

async function verifyToken(req, res, next) {
  // getting the access token
  const idToken =
    req.headers.authorization?.split(" ")[1] || req.cookies?.access_token;
  const refreshToken = req.cookies?.refresh_token;

  // Check if the access token is present
  if (!idToken) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    // Verify the ID token
    req.user = await admin.auth().verifyIdToken(idToken);
    // if token is verified then next
    return next();
  } catch (error) {
    /*    if token is expired then generate a new token */
    if (error.code === "auth/id-token-expired" && refreshToken) {
      try {
        // Refresh the token using Firebase Secure Token API
        const url = `https://securetoken.googleapis.com/v1/token?key=${envVars.firebase.apiKey}`;
        const response = await axios.post(url, {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        });

        const { id_token, refresh_token } = response.data;

        // Update cookies and headers with new tokens
        res.cookie("access_token", id_token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        // setting token in headers
        res.setHeader("Authorization", `Bearer ${id_token}`);
        req.user = await admin.auth().verifyIdToken(id_token);
        // again check token validity
        return next();
      } catch (refreshError) {
        return res.status(403).json({
          message: "Failed to refresh token",
          error: refreshError.message,
        });
      }
    }

    return res.status(403).json({ message: "Invalid or expired access token" });
  }
}

module.exports = { verifyToken };
