import { apiRequest } from "@/api/client";
import type { User } from "@/types/identity";

export const userService = {
  getMe(): Promise<User> {
    return apiRequest<User>("/users/me");
  },

  updateMe(data: { name?: string | null }): Promise<User> {
    return apiRequest<User>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};
