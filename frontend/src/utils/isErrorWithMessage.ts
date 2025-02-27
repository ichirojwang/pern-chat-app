export const isErrorWithMessage = (error: unknown): error is {message:string} => {
  return error !== null && typeof error === "object" && "message" in error;
};
