import { currentUser, auth as clerkAuth } from "@clerk/nextjs";

export const auth = clerkAuth;

export const getUser = async () => {
  const user = await currentUser();
  return user;
};
