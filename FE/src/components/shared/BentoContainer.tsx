interface BentoContainerProps {
  children: React.ReactNode;
}

export const BentoContainer = ({ children }: BentoContainerProps) => {
  return (
    <div className="flex flex-col h-fit p-6 rounded-4xl w-full bg-white shadow-lg">
      {children}
    </div>
  );
};
