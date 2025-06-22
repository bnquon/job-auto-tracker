import type { LoginData } from "../src/components/LoginForm";
import type { SignUpData } from "../src/components/SignUpForm";
import { api } from "../src/utils/axios"

export async function LoginAndSignupHelper(
  formData: LoginData | SignUpData,
  endpoint: string
) {
  try {
    const res = await api.post(endpoint, formData);
    if (res.status === 200) {
      const { access_token } = res.data;
      localStorage.setItem("token", access_token);      
    }
    return true;
  } catch (err) {
    console.error("API error:", err);
    return false;
  }
}
