import { BentoContainer } from "./BentoContainer";

interface OverviewBlocksProps {
  title: string;
  value: string;
}

export const OverviewBlocks = ({ title, value }: OverviewBlocksProps) => {
  return (
    <BentoContainer>
      <div className="rounded-lg p-4 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-[#00d4ff]">{value}</p>
        <p className="text-white text-xl">{title}</p>
      </div>
    </BentoContainer>
  );
};
