import React from "react";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import EmailTemplate from "@/lib/emails/sign-in-email";


export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    verifyRequest: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
      allowDangerousEmailAccountLinking: true,
    }),
    ResendProvider({
      from: process.env.RESEND_FROM_EMAIL,
      sendVerificationRequest: async (params) => {
        const { identifier: to, url, provider } = params;
        const { host } = new URL(url);

        const { renderToStaticMarkup } = await import("react-dom/server");
        const emailHtml = String(
          renderToStaticMarkup(
            React.createElement(EmailTemplate, { url, host })
          )
        );
        const text = `Sign in to ${host}\n${url}\n\n`;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${provider.apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `Login to fridge app <${process.env.RESEND_FROM_EMAIL}>`,
              to,
              subject: `Sign in to ${host}`,
              html: emailHtml,
              text,
            }),
          });

          if (!res.ok) {
            const error = await res.json();
            console.error("Resend API error:", error);
            throw new Error(error.message || "Failed to send email");
          }

          return;
        } catch (error) {
          console.error("Verification email error:", error);
          throw error;
        }
      },
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        // Check for valid email with Google provider
        if (account?.provider === "google" && !user.email) {
          return false;
        }

        // Check for valid email with Resend provider
        if (account?.provider === "resend" && !user.email) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      try {
        // Handle empty or invalid URLs
        if (!url) {
          return `${baseUrl}/dashboard`;
        }

        // Handle callback URL
        try {
          const urlObject = new URL(
            url.startsWith("http") ? url : `${baseUrl}${url}`
          );
          const callbackUrl = urlObject.searchParams.get("callbackUrl");

          if (callbackUrl) {
            if (callbackUrl.startsWith("/")) {
              return `${baseUrl}${callbackUrl}`;
            }
            try {
              const callbackUrlObject = new URL(callbackUrl);
              if (callbackUrlObject.origin === baseUrl) {
                return callbackUrl;
              }
            } catch {
              // Invalid callback URL, fall through to default
            }
          }
        } catch {
          // Invalid URL, fall through to default
        }

        // Default redirect logic
        if (url.startsWith("/")) {
          return `${baseUrl}${url}`;
        }
        if (url.startsWith(baseUrl)) {
          return url;
        }

        // Default fallback
        return `${baseUrl}/dashboard`;
      } catch (error) {
        console.error("Redirect error:", error);
        return `${baseUrl}/dashboard`;
      }
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      try {
        if (isNewUser && user.id) {
          // Create any initial user data or setup here
          // For example, create a default profile, etc.
          console.log("New user signed up:", user.id);
        }
      } catch (error) {
        console.error("Sign in event error:", error);
      }
    },
  },
});

// Export for future use, currently not used
export async function generateVerificationToken(): Promise<string> {
  // Implementation maintained for future use
  return "token";
}

export async function sendVerificationEmail() {
  // Implementation maintained for future use
}
