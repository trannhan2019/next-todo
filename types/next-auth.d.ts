// import { DefaultSession, DefaultUser } from "next-auth";
// import { DefaultJWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       role: string;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     role: string;
//   }

//   interface JWT extends DefaultJWT {
//     id: string;
//     role: string;
//   }
// }

/////////////////////////////////

// import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       role: string;
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

//////////////////////////////////////
import { DefaultSession, DefaultUser } from "next-auth";
declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }
  // ...

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // add `role` property
  }
}
