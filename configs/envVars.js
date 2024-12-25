const Joi = require("@hapi/joi");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    FIREBASE_API_KEY: Joi.string().required().description("Firebase API key"),
    FIREBASE_AUTH_DOMAIN: Joi.string()
      .required()
      .description("Firebase auth domain"),
    FIREBASE_PROJECT_ID: Joi.string()
      .required()
      .description("Firebase project ID"),
    FIREBASE_STORAGE_BUCKET: Joi.string()
      .required()
      .description("Firebase storage bucket"),
    FIREBASE_MESSAGING_SENDER_ID: Joi.string()
      .required()
      .description("Firebase messaging sender ID"),
    FIREBASE_APP_ID: Joi.string().required().description("Firebase app ID"),
    FIREBASE_SERVICE_ACCOUNT_BASE64: Joi.string()
      .required()
      .description("Firebase service account"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  firebase: {
    apiKey: envVars.FIREBASE_API_KEY,
    authDomain: envVars.FIREBASE_AUTH_DOMAIN,
    projectId: envVars.FIREBASE_PROJECT_ID,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.FIREBASE_APP_ID,
    serviceAccount: JSON.parse(
      Buffer.from(envVars.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString()
    ),
  },
};
