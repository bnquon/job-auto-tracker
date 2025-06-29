import { SignUpForm } from "@/components/SignUpForm";
import { ScanText } from "lucide-react";

export const SignUp = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-gray-950">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <ScanText className="size-4" color="#00d4ff" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md box-border p-6 border-[1px] border-[#1e1e1e] rounded-2xl">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-placeholder.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
