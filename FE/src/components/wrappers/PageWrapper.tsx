import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div
      className="bg-black min-h-screen flex items-start justify-center p-4"
    >
      <div className="max-w-[1800px] w-full gap-6 flex flex-col">
        {children}
      </div>
    </div>
  );
};
