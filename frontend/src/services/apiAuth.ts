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
}: SignupArgs): Promise<UserType> => {
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

export const login = async ({ username, password }: LoginArgs): Promise<UserType> => {
  const res = await axios.post("/api/auth/login", { username, password });

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const res = await axios.post("api/auth/logout");

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};

export const getMe = async (): Promise<UserType> => {
  const res = await axios.get("/api/auth/me");

  if (res.data.error) {
    throw new Error(res.data.error);
  }

  return res.data;
};
