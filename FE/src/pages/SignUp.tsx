import { SignUpForm } from "@/components/SignUpForm";
import { ScanText } from "lucide-react";

export const SignUp = () => {
  return (
    <div className="grid min-h-svh bg-gray-950 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-md">
            <ScanText className="size-8" color="#00d4ff" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md box-border p-6 border-[1px] border-[#1e1e1e] rounded-2xl">
            <SignUpForm />
          </div>
        </div>
      </div>
      <div className="bg-gray-950 relative hidden lg:block p-12 box-border">
        <div className="bg-[#00d4ff] w-full h-full rounded-2xl flex flex-col justify-center items-center">
          <p className="text-[40px] leading-[1.2] font-extrabold mb-8 w-[85%] text-center text-black">
            See how easy it is to track your applications
          </p>
          <p className="text-[30px] leading-[1.2] font-semibold mb-16 w-[85%] text-center text-[#1e1e1e]">
            No more filling in template forms or spreadsheet columns
          </p>
          <div className="w-[85%] relative">
            <video
              src="/SSAutoDashboardVideoDemo.mp4"
              muted
              loop
              playsInline
              autoPlay
              controls
              className="w-full h-auto rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
