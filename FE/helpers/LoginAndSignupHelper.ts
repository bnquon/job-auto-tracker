import type { LoginData } from "../types/LoginData";
import type { SignUpData } from "../types/SignUpData";
import { api } from "../src/utils/axios";

interface AuthResponse {
  message: string;
  access_token?: string;
  token_type?: string;
}

export async function LoginAndSignupHelper(
  formData: LoginData | SignUpData,
  endpoint: string
) {
  try {
    const response = await api.post<AuthResponse>(endpoint, formData);
    if (response.data.access_token !== undefined) {
      return response.data.access_token;
    }
  } catch (err) {
    console.error("API error:", err);
    return false;
  }
}
