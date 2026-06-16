import { apiRequest } from "./api";

export const submitContactForm = (formData) =>
  apiRequest("/api/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });
