const jwt = require("jsonwebtoken");
const axios = require("axios");

const verifyJWT = async (token, projectId) => {
  try {
    // Fetch public keys from Firebase
    const { data: publicKeys } = await axios.get(
      "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"
    );

    // Decode token without verification to get the kid
    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader || typeof decodedHeader !== "object") {
      throw new Error("Invalid token header");
    }

    const kid = decodedHeader.header.kid;
    if (!kid || !publicKeys[kid]) {
      throw new Error("Invalid kid or key not found");
    }

    // Verify the token with the correct public key
    const verifiedToken = jwt.verify(token, publicKeys[kid], {
      algorithms: ["RS256"], // Firebase uses RS256
      audience: projectId, // Your Firebase project ID
      issuer: `https://securetoken.google.com/${projectId}`,
    });

    return verifiedToken; // Successfully verified token
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};
module.exports = verifyJWT;
