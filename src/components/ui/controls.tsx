import { cn } from "@/lib/utils";

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-xs font-medium text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}

const controlClass =
  "w-full rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlClass, "min-h-20 resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn("h-px bg-zinc-200", className)} />;
}