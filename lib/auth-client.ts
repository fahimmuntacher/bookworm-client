// lib/auth-client.ts
"use client";

import { createAuthClient } from "better-auth/react";
// If you use plugins like twoFactor, organization, etc. import them here
// import { twoFactorClient } from "better-auth/plugins/two-factor";
// import { organizationClient } from "better-auth/plugins/organization";

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  // Add any other methods you plan to use frequently:
  // signInWithGoogle,
  // signInWithGithub,
  // forgotPassword,
  // resetPassword,
  // updateUser,
  // getSession,
  // ...
} = createAuthClient({
  // Optional: only needed if your API is on a different domain/origin
  baseURL: "http://localhost:5000",

  // Add plugins if you're using them (uncomment and adjust as needed)
  // plugins: [
  //   twoFactorClient(),
  //   organizationClient(),
  // ],
});
