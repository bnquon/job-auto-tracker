import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { LoginAndSignupHelper } from "../../helpers/LoginAndSignupHelper";
import { LoginSchema } from "../../schemas/LoginSchema";
import type { LoginData } from "../../types/LoginData";
import { toast } from "sonner";
import { useAuth } from "@/context/Auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(formData: LoginData) {
    const token = await LoginAndSignupHelper(formData, "users/login/");
    if (token) {
      login(token);
      navigate("/app");
    } else {
      toast.error("Login failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#00d4ff]">
          Login to your account
        </h1>
        <p className="text-[#ccc] text-sm text-balance">
          Enter your email and password to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label className="text-[#ccc] text-lg" htmlFor="email">
            Email
          </Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label className="text-[#ccc] text-lg" htmlFor="password">
            Password
          </Label>
          <Input
            {...register("password")}
            className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
            id="password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#00d4ff] hover:bg-[#00d4ff]/70"
        >
          Login
        </Button>
      </div>
      <div className="text-center text-sm text-[#ccc]">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="underline underline-offset-4 text-[#00d4ff] hover:text-[#00d4ff]/70"
        >
          Sign up
        </a>
      </div>
    </form>
  );
}
