require("dotenv").config();
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const envVars = require("../configs/envVars");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} = require("firebase/auth");

const serviceAccount = envVars.firebase.serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: envVars.firebase.apiKey,
  authDomain: envVars.firebase.authDomain,
  projectId: envVars.firebase.projectId,
  storageBucket: envVars.firebase.storageBucket,
  messagingSenderId: envVars.firebase.messagingSenderId,
  appId: envVars.firebase.appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin,
  onAuthStateChanged,
};
