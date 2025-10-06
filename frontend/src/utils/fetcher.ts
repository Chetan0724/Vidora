import { userStore } from "@/stores/user.store";

export const authFetch = async (
  url: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  const { accessToken, setAccessToken } = userStore.getState();

  if (!accessToken) throw new Error("Unauthroized: Access Token Missing");

  const headers = {
    ...init.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...init,
    headers,
  };

  let response = await fetch(url, config);

  if (response.status === 401) {
    try {
      const refreshRes = await fetch(
        "http://localhost:3000/api/users/refresh-token",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!refreshRes.ok) {
        throw new Error("Refresh token failed");
      }

      const data = await refreshRes.json();
      setAccessToken(data.accessToken);

      const retryHeaders = {
        ...init.headers,
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      };

      const retryConfig: RequestInit = { ...init, headers: retryHeaders };
      response = await fetch(url, retryConfig);
    } catch (err) {
      console.error("Token refresh failed:", err);
      throw err;
    }
  }
  return response;
};
