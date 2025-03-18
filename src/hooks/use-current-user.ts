// hooks/useCurrentUser.ts
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export const useCurrentUser = () => {
  const { data: session, status } = useSession();

  return {
    isLoading: status === "loading",
    data: session?.user as User | null,
  };
};
