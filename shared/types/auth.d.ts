// shared/types/auth.d.ts
declare module '#auth-utils' {
  interface User {
    // Add your own fields
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
  }

  interface UserSession {
    // Add your own fields
    user: User;
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}