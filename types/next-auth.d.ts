import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

///////
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       role: string | undefined | null;
//     } & DefaultSession["user"];
//   }
// }
///////
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { role: string };
  }
  interface User extends DefaultUser {
    role: string;
  }
}
