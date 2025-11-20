import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import dotenv from "dotenv";
dotenv.config();

import {
  username,
  phoneNumber,
  jwt,
  admin,
  twoFactor,
  openAPI,
  organization,
} from "better-auth/plugins";
import Database from "better-sqlite3";

export const auth = betterAuth({
  trustedOrigins: [
    "nikkahlyapp://*",
    "exp://192.168.1.20:8081",
    "http://localhost:3005",
  ],
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: "http://localhost:3005/api/auth/callback/google",
    },
  },
  plugins: [
    expo(),
    openAPI(),
    jwt(),
    admin(),
    twoFactor(),
    username(),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        // Implement sending OTP code via SMS
        // TODO for
        console.log("phoneNumber", phoneNumber);
      },
    }),
    organization(),
  ],
});
