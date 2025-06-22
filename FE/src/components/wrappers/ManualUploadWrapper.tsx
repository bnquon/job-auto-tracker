import { ManualJobApplication } from "../ManualJobApplication";
import { BentoContainer } from "../shared/BentoContainer";

export function ManualUploadWrapper() {
  return (
    <BentoContainer>
      <ManualJobApplication />
    </BentoContainer>
  )
}