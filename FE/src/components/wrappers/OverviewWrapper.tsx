import { OverviewBlocks } from "../shared/OverviewBlocks";
import { BentoContainer } from "../shared/BentoContainer";
import { FileText, Clock, MessageCircle } from "lucide-react";

export const OverviewWrapper = () => {
  return (
    <BentoContainer>
      <p className="text-3xl mb-6">ANOTHER DAY ANOTHER SLAY</p>
      <div className="flex gap-4">
        <OverviewBlocks
          title="Total Applications"
          value={100}
          icon={<FileText size={32}/>}
        />
        <OverviewBlocks
          title="Active Applications"
          value={100}
          icon={<Clock size={32}/>}
        />
        <OverviewBlocks
          title="Total Applications"
          value={100}
          icon={<MessageCircle size={32}/>}
        />
      </div>
    </BentoContainer>
  );
};
