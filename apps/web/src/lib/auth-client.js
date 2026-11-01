'use client';

import { createAuthClient } from 'better-auth/react';

const apiOrigin =
  process.env.NEXT_PUBLIC_SOCKET_URL ||
  (process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '')
    : 'http://localhost:4000');

export const authClient = createAuthClient({
  baseURL: apiOrigin,
});

export const { signIn, signUp, signOut, useSession } = authClient;
