interface EmptyStateProps {
  mainText: string;
  subText: string;
}

export const EmptyState = ({ mainText, subText }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-xl font-medium mb-2 text-white">
        {mainText}
      </div>
      <div className="text-base text-[#b3b3b3] text-center">
        {subText}
      </div>
    </div>
  );
};
