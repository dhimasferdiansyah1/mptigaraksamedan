import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

function SkeletonReloadIcon({
  className,
  width = "200px" as React.CSSProperties["width"], // Add default width for better rendering
  height = "50px" as React.CSSProperties["height"], // Add default height for better rendering
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
}) {
  return (
    <div
      className={cn(
        "flex animate-pulse items-center justify-center rounded-md bg-muted bg-opacity-65", // Center icon
        className,
      )}
      style={{ width, height }} // Apply default width and height
      {...props}
    >
      <RotateCw
        size="24" // Customize size as needed
        color="currentColor" // Use current color or set desired color
        className="mx-auto animate-spin text-zinc-600" // Center and add spin animation
      />
    </div>
  );
}

export { SkeletonReloadIcon };
