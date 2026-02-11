import { prisma } from "../utils/db";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user: githubUser, tokens }) {
    // Find or create user account
    let account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: String(githubUser.id),
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
        },
      });
      user = account.user;
    } else {
      // Check if user exists with same email
      const existingUser = githubUser.email
        ? await prisma.user.findUnique({
            where: { email: githubUser.email },
          })
        : null;

      if (existingUser) {
        // Link GitHub account to existing user
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: "github",
            providerAccountId: String(githubUser.id),
            accessToken: tokens.access_token,
          },
        });
        user = existingUser;
      } else {
        // Create new user with GitHub account
        const username = githubUser.login || `user_${githubUser.id}`;

        // Make sure username is unique
        let uniqueUsername = username;
        let counter = 1;
        while (await prisma.user.findUnique({ where: { username: uniqueUsername } })) {
          uniqueUsername = `${username}_${counter}`;
          counter++;
        }

        user = await prisma.user.create({
          data: {
            email: githubUser.email!,
            username: uniqueUsername,
            firstName: githubUser.name?.split(" ")[0] || undefined,
            lastName: githubUser.name?.split(" ").slice(1).join(" ") || undefined,
            avatar: githubUser.avatar_url,
            role: "USER",
            accounts: {
              create: {
                provider: "github",
                providerAccountId: String(githubUser.id),
                accessToken: tokens.access_token,
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
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/?error=github_oauth_failed");
  },
});