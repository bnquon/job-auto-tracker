import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div 
      className={`flex items-center justify-center w-full h-full ${className}`} 
      {...props}
    >
      <CircularProgress size="4rem" />
    </div>
  );
}