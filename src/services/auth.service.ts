import { apiRequest } from "@/api/client";
import type { User } from "@/types/identity";

interface RequestOtpResponse {
  expiresIn: number;
}

interface VerifyOtpResponse {
  user: User;
}

export const authService = {
  requestOtp(phone: string): Promise<RequestOtpResponse> {
    return apiRequest<RequestOtpResponse>("/auth/otp/request", {
      method: "POST",
      body: JSON.stringify({ phone }),
    });
  },

  verifyOtp(phone: string, code: string): Promise<VerifyOtpResponse> {
    return apiRequest<VerifyOtpResponse>("/auth/otp/verify", {
      method: "POST",
      body: JSON.stringify({ phone, code }),
    });
  },
};
