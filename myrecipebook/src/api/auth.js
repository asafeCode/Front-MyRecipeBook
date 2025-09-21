// src/api/auth.js
import Api from "../services/api.js";

export const registerUser = async ({ name, email, password }) => {
  return Api.post("/user", { name, email, password });
};

export const loginUser = async ({ email, password }) => {
  return Api.post("/login", { email, password });
};

export const getUserProfile = async (token) => {
  return Api.get("/user", {}, token);
};
