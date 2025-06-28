import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps extends React.ComponentProps<"div"> {
  loadingText?: string;
  variant?: "fullscreen" | "overlay";
}

export default function Loading({
  className,
  loadingText,
  variant = "fullscreen",
  ...props
}: LoadingProps) {
  const baseClasses =
    variant === "fullscreen"
      ? "fixed inset-0 z-50 bg-black/50"
      : "absolute inset-0 z-50 bg-black/50";

  return (
    <div
      className={`${baseClasses} flex flex-col items-center justify-center gap-4 ${className}`}
      {...props}
    >
      <CircularProgress size="4rem" />
      {loadingText && <p className="text-[#00d4ff] text-lg">{loadingText}</p>}
    </div>
  );
}
