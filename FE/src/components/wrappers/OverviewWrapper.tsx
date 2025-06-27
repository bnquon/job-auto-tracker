import { OverviewBlocks } from "../shared/OverviewBlocks";

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
    <div className="flex gap-4">
      <OverviewBlocks title="Total" value={total.toString()} />
      <OverviewBlocks title="Active" value={active.toString()} />
      <OverviewBlocks
        title="Response Rate"
        value={
          total === 0
            ? "--%"
            : `${Math.round((responseRate / total) * 1000) / 10}%`
        }
      />
    </div>
  );
};
