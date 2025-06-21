import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, white 0%, #fef7f7 60%, #fce7f3 100%)",
      }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="max-w-[1440px] w-full gap-6 flex flex-col">
        {children}
      </div>
    </div>
  );
};
