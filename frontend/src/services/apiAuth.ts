import axios from "axios";

export interface SignupArgs {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

export interface LoginArgs {
  username: string;
  password: string;
}

export const signup = async ({
  username,
  fullName,
  password,
  confirmPassword,
  gender,
}: SignupArgs) => {
  const res = await axios.post("/api/auth/signup", {
    username,
    fullName,
    password,
    confirmPassword,
    gender,
  });

  if (res.data.error) {
    throw new Error(res.data.error);
  }
  return res.data;
};

export const login = async ({ username, password }: LoginArgs) => {
  const res = await axios.post("/api/auth/login", { username, password });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const logout = async () => {
  const res = await axios.post("api/auth/logout");

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const getMe = async () => {
  const res = await axios.get("/api/auth/me");

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};
