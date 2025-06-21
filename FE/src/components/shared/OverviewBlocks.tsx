interface OverviewBlocksProps {
  title: string;
  value: number;
  icon: React.ReactNode
}

export const OverviewBlocks = ({ title, value, icon}: OverviewBlocksProps) => {
  return (
    <div className="bg-rose rounded-lg p-6 flex flex-col gap-6 w-1/3">
      <div className="flex gap-4 text-2xl">
        {icon}
        <p>{title}</p>
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};
