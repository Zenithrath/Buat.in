import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border border-zinc-200",
        variant === "ghost" && "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
        variant === "danger" && "bg-red-50 text-red-600 hover:bg-red-100",
        className
      )}
      {...props}
    />
  );
}