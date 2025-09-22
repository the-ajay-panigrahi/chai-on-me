import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// 1. We've created a separate configuration object called authOptions.
// 2. We've added "export" so other files can import it.
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // It's good practice to include the secret here too
};

// 3. We now pass the authOptions object to the NextAuth function.
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

