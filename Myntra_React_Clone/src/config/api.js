export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getUserId = () => {
  const key = "myntra_guest_user_id";
  let userId = localStorage.getItem(key);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(key, userId);
  }

  return userId;
};
