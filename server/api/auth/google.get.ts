import { prisma } from "../utils/db";

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ["email", "profile"],
  },
  async onSuccess(event, { user: googleUser, tokens }) {
    // Find or create user account
    let account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: googleUser.sub,
        },
      },
      include: { user: true },
    });

    let user;

    if (account) {
      // Update tokens
      await prisma.account.update({
        where: { id: account.id },
        data: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: tokens.expires_in
            ? Math.floor(Date.now() / 1000) + tokens.expires_in
            : null,
        },
      });
      user = account.user;
    } else {
      // Check if user exists with same email
      const existingUser = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      if (existingUser) {
        // Link Google account to existing user
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: "google",
            providerAccountId: googleUser.sub,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expires_in
              ? Math.floor(Date.now() / 1000) + tokens.expires_in
              : null,
          },
        });
        user = existingUser;
      } else {
        // Create new user with Google account
        const baseUsername = googleUser.email.split("@")[0];

        // Make sure username is unique
        let uniqueUsername = baseUsername;
        let counter = 1;
        while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
          uniqueUsername = `${baseUsername}_${counter}`;
          counter++;
        }

        user = await prisma.user.create({
          data: {
            email: googleUser.email,
            username: uniqueUsername,
            firstName: googleUser.given_name || null,
            lastName: googleUser.family_name || null,
            avatar: googleUser.picture,
            role: "USER",
            accounts: {
              create: {
                provider: "google",
                providerAccountId: googleUser.sub,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresAt: tokens.expires_in
                  ? Math.floor(Date.now() / 1000) + tokens.expires_in
                  : null,
              },
            },
          },
        });
      }
    }

    // Set user session
    await setUserSession(event, {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar || undefined,
        role: user.role,
      },
    });

    // Redirect to home page
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/?error=google_oauth_failed");
  },
});