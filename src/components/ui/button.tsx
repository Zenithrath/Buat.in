import { cn } from "@/lib/utils";

const VARIANTS = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-input bg-background hover:border-brand/40 hover:bg-brand/5 hover:text-brand",
  ghost: "hover:bg-brand/10 hover:text-brand",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  link: "text-brand underline-offset-4 hover:underline",
  brand: "bg-brand text-brand-foreground hover:bg-brand-hover",
} as const;

const SIZES = {
  xs: "h-6 px-2 text-xs gap-1",
  sm: "h-8 px-3 text-xs gap-1.5",
  default: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-6 text-sm gap-2",
  icon: "h-9 w-9",
  "icon-sm": "h-8 w-8",
  "icon-lg": "h-10 w-10",
} as const;

type Variant = keyof typeof VARIANTS;
type Size = keyof typeof SIZES;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  );
}