export const authFetch = async (endpoint: string, options = {}, isRetry = false): Promise<Response | null> => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options as any).headers,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  if (res.status === 401 && !isRetry) {
    console.log("Access token expired, attempting to refresh...");

    const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      return await authFetch(endpoint, options, true);
    } else {
      try {
        const errorData = await refreshRes.json();
        console.error("Refresh failed:", errorData);
      } catch (e) {
        console.error("Refresh failed");
      }
      window.location.href = `/login`;

      return null;
    }
  } else {
    return res;
  }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
