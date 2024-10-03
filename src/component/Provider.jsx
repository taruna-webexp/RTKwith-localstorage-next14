"use client";

import { SessionProvider } from "next-auth/react";

const NextProviders = ({ children, session }) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default NextProviders;