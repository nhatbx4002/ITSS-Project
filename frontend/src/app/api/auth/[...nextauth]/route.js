  import NextAuth from "next-auth";
  import GoogleProvider from "next-auth/providers/google";
  import CredentialsProvider from "next-auth/providers/credentials";

  const handler = NextAuth({
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            scope: 'openid profile email',
          },
        },
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const response = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          });
          if (!response.ok) {
            return null;
          }
          const data = await response.json();
         return {
          id: data.user._id,
          name: data.user.full_name,
          email: data.user.email,
          image: data.user.image,
          role: data.user.role,
          authToken: data.authToken,
         };
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === 'google' && account?.id_token) {
          try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/auth/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken: account.id_token }),
            });
            if (!response.ok) {
              console.error('Failed to authenticate with backend');
              return false;
            }
            const data = await response.json();
            user.authToken = data.authToken;
            user.role = data.user.role;
          } catch (error) {
            console.error('Error during backend authentication:', error);
            return false;
          }
        }
        return true;
      },
      async jwt({ token, user }) {
        if (user?.authToken) {
          token.authToken = user.authToken;
          token.role = user.role;
        }
        return token;
      },
      async session({ session, token }) {
        if (token?.authToken) {
          session.authToken = token.authToken;
          session.role = token.role;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  export { handler as GET, handler as POST };
