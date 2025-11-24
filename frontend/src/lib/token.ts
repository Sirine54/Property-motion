let accessToken: string | null = null;

export function getAccessTokenGlobal(): string | null {
  return accessToken;
}

export function setAccessTokenGlobal(token: string | null): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}
