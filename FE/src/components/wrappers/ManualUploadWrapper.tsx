import { ManualJobApplication } from "../ManualJobApplication";
import { BentoContainer } from "../shared/BentoContainer";

interface ManualUploadWrapperProps {
  currentCycleId: number;
}

export function ManualUploadWrapper({
  currentCycleId,
}: ManualUploadWrapperProps) {
  return (
    <BentoContainer>
      <ManualJobApplication currentCycleId={currentCycleId} />
    </BentoContainer>
  );
}
