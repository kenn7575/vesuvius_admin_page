// utils/authFetch.ts

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  console.log("🚀 ~ token:", token);

  options.headers = options.headers || {};
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  options.headers = headers;

  let response = await fetch(url, options);

  if (response.status === 401) {
    const newToken = await refreshToken();

    if (newToken) {
      setToken(newToken);
      headers.set("Authorization", `Bearer ${newToken}`);
      options.headers = headers;

      response = await fetch(url, options);
    } else {
      throw new Error("Unauthorized");
    }
  }

  return response;
}

function getToken(): string | null {
  return localStorage.getItem("accessToken");
}

function setToken(token: string): void {
  localStorage.setItem("accessToken", token);
}

async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:5005/auth/refresh-token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // If you need to send a refresh token from storage
      // body: JSON.stringify({ refreshToken: getRefreshToken() }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const newAccessToken = data.accessToken as string;

    setToken(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}
