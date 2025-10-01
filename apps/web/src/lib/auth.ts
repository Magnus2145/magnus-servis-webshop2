import { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import nodemailer from 'nodemailer';
import { MemoryAdapter } from '@auth/memory-adapter';

const transport = nodemailer.createTransport({
  streamTransport: true,
  newline: 'unix',
  buffer: true,
});

export const authOptions: NextAuthOptions = {
  adapter: MemoryAdapter(),
  session: {
    strategy: 'jwt',
  },
  providers: [
    EmailProvider({
      maxAge: 24 * 60 * 60,
      sendVerificationRequest: async ({ identifier, url }) => {
        const message = {
          to: identifier,
          from: 'dev@magnus-servis.local',
          subject: 'Magnus Servis prijava',
          text: `Prijavite se putem poveznice: ${url}`,
        };
        await transport.sendMail(message);
        console.info('Dev login link generated for %s: %s', identifier, url);
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as { id: string; email?: string | null };
      }
      return session;
    },
  },
};
