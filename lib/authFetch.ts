export const authFetch = async (endpoint: string, options = {}, isRetry = false): Promise<Response | null> => {
  try {
    let res = await fetch(`http://localhost:5000${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options as any).headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  if (res.status === 401 && !isRetry) {
    console.log("Access token expired, attempting to refresh...");

    const refreshRes = await fetch("http://localhost:5000/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json();

      localStorage.setItem("token", refreshData.accessToken);


      return await authFetch(endpoint, options, true);
    } else {
      localStorage.removeItem("token");
      try {
        const errorData = await refreshRes.json();
        console.log("Refresh failed:", errorData);
      } catch (e) {
        console.log("Refresh failed");
      }
      window.location.href = "/login";

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
