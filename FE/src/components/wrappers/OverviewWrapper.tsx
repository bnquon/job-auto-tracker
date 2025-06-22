import { OverviewBlocks } from "../shared/OverviewBlocks";
import { BentoContainer } from "../shared/BentoContainer";
import { FileText, Clock, MessageCircle } from "lucide-react";

interface IOverviewWrapper {
  total: number;
  active: number;
  responseRate: number;
}

export const OverviewWrapper = ({
  total,
  active,
  responseRate,
}: IOverviewWrapper) => {
  return (
    <BentoContainer>
      <p className="text-3xl mb-6">ANOTHER DAY ANOTHER SLAY</p>
      <div className="flex gap-4">
        <OverviewBlocks
          title="Total"
          value={total.toString()}
          icon={<FileText size={32} />}
        />
        <OverviewBlocks
          title="Active"
          value={active.toString()}
          icon={<Clock size={32} />}
        />
        <OverviewBlocks
          title="Response Rate"
          value={`${((responseRate / total) * 100).toString()}%`}
          icon={<MessageCircle size={32} />}
        />
      </div>
    </BentoContainer>
  );
};
