const { default: axios } = require("axios");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} = require("../configs/firebase");
const envVars = require("../configs/envVars");

const auth = getAuth();

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password } = req.body;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            res.status(201).json({
              message: "Verification email sent! User created successfully!",
            });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error sending email verification" });
          });
      })
      .catch((error) => {
        const errorMessage =
          error.message || "An error occurred while registering user";
        res.status(500).json({ error: errorMessage });
      });
  }

  loginUser(req, res) {
    const { email, password } = req.body;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        const refreshToken = userCredential._tokenResponse.refreshToken;
        if (idToken) {
          res.cookie("access_token", idToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });
          res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });

          res
            .status(200)
            .json({ message: "User logged in successfully", userCredential });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage =
          error.message || "An error occurred while logging in";
        res.status(500).json({ error: errorMessage });
      });
  }
  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie("access_token");
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
  resetPassword(req, res) {
    const { email } = req.body;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        res
          .status(200)
          .json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
  // controllers/authController.js
  async refreshToken(req, res) {
    try {
      // Extract refresh token from cookies or request body
      const { refreshToken } = req.cookies || req.body;

      // Validate refresh token presence
      if (!refreshToken) {
        return res.status(400).json({ error: "Missing refresh token" });
      }
      // Firebase API Key
      const apiKey = process.env.FIREBASE_API_KEY || envVars.firebase.apiKey;
      // Send request to Firebase Secure Token API
      const { data } = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Return only the token data
      return res.json(data);
    } catch (error) {
      console.error(
        "Error refreshing token:",
        error.response?.data || error.message
      );

      // Send appropriate error response
      const status = error.response?.status || 500;
      return res.status(status).json({ error: "Failed to refresh token" });
    }
  }
}

module.exports = new FirebaseAuthController();
