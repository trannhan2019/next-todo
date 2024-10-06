import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface DefaultSession {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

// (property) DefaultSession.user?: {
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
// }
