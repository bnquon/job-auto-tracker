import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAndSignupHelper } from "../../helpers/LoginAndSignupHelper";
import { useNavigate } from "react-router";
import { SignUpSchema } from "../../schemas/SignUpSchema";
import type { SignUpData } from "../../types/SignUpData";
import { toast } from "sonner";
import { useAuth } from "@/context/Auth";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(formData: SignUpData) {
    const token = await LoginAndSignupHelper(formData, "users/standard");
    if (token) {
      login(token);
      navigate("/app");
    } else {
      toast.error("Sign up failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#00d4ff]">
          Sign up and create an account
        </h1>
        <p className="text-[#ccc] text-sm text-balance">
          Enter your email and password below
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
            id="password"
            type="password"
            className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label className="text-[#ccc] text-lg" htmlFor="confirmPassword">
            Confirm your password
          </Label>
          <Input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            className="bg-[#2a2a2a] border-[#444] text-[#e0e0e0]"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[#00d4ff] hover:bg-[#00d4ff]/70"
        >
          Sign up
        </Button>
      </div>
      <div className="text-center text-sm text-[#ccc]">
        Already have an account?{" "}
        <a
          href="/"
          className="underline underline-offset-4 text-[#00d4ff] hover:text-[#00d4ff]/70"
        >
          Login
        </a>
      </div>
    </form>
  );
}
