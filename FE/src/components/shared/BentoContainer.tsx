interface BentoContainerProps {
  children: React.ReactNode;
}

export const BentoContainer = ({ children }: BentoContainerProps) => {
  return (
    <div className="flex flex-col h-full p-6 rounded-4xl w-full bg-[#1e1e1e] shadow-lg">
      {children}
    </div>
  );
};
