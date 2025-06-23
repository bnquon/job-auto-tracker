interface OverviewBlocksProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export const OverviewBlocks = ({ title, value, icon }: OverviewBlocksProps) => {
  return (
    <div className="rounded-lg p-4 flex justify-between w-1/3">
      <div className="flex gap-4 text-xl">
        {icon}
        <p>{title}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};
