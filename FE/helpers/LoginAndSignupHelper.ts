import type { LoginData } from "../types/LoginData";
import type { SignUpData } from "../types/SignUpData";
import { api } from "../src/utils/axios"

export async function LoginAndSignupHelper(
  formData: LoginData | SignUpData,
  endpoint: string
) {
  try {
    await api.post(endpoint, formData);
    return true;
  } catch (err) {
    console.error("API error:", err);
    return false;
  }
}
