import { userStore } from "@/stores/user.store";

export const authFetch = async (
  url: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  const { accessToken } = userStore.getState();

  if (!accessToken) {
    console.error("Acess Token missing. User must login");
    throw new Error("Unauthroized: Access Token Missing");
  }

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...init,
    headers,
  };

  return fetch(url, config);
};
