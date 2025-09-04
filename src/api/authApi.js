export async function fetchMe() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("no token");
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/jwt`, {
    method: "GET", // POST도 가능 (백엔드에서 둘 다 허용)
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("me failed");
  return await res.json(); // { message, user }
}
