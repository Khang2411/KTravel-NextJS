import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from 'next/headers';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<any> {
      let params = { ...user, provider_id: user.id, provider: account?.provider }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/social/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params)
      });

      const login = await response.json() as any;

      console.log(params)
      console.log(login)
      cookies().set('accessToken', login.data.token)
      return true
    },

    async jwt({ token, user, account, profile }) {
      if (user) {
        token = { ...user, provider_id: user.id, provider: account?.provider }
      }
      return token
    },

    async session({ session, user, token }) {
      session.user = token
      return session
    }
  },
})

export { handler as GET, handler as POST };

