import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const userDetails = {
          id: 1,
          email: "demo@yopmail.com",
          password: "12345",
        };
        if (
          credentials.email === userDetails.email &&
          credentials.password === userDetails.password
        ) {
          return userDetails;
        } else {
          return null;
        }
      },
    }),
  ],
});
export { handler as GET, handler as POST };
