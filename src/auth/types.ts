export type AuthUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export type GoogleJwtPayload = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};

export const AUTH_STORAGE_KEY = 'mentora-auth-user';
