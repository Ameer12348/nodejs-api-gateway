async function refreshFirebaseToken(refreshToken) {
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
  return data;
}

module.exports = refreshFirebaseToken;
