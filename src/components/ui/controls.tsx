import { ChevronDown, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { uid } from "@/lib/utils";
import { useBuilderStore } from "@/lib/store/project-store";
import type { Asset } from "@/lib/schema/types";

export function Field({
  label,
  children,
  className,
  htmlFor,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-8 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent py-1 pl-2.5 pr-7 text-xs text-foreground transition-colors focus:outline-none focus:ring-1 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={13}
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export { Input, Textarea, Label, Separator };

/**
 * Kontrol gambar per PRD §3.3: unggah dari komputer, tempel URL, atau
 * kosongkan agar komponen memakai placeholder otomatis (mis. inisial nama).
 * Gambar yang diunggah didaftarkan ke dokumen (panel Gambar) dan saat ekspor
 * ditulis ke folder assets/ dengan nama file yang dibersihkan.
 */
export function ImageField({
  value,
  onChange,
  placeholder = "Tempel URL gambar atau unggah file",
  label = "Gambar",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}) {
  const addAssets = useBuilderStore((s) => s.addAssets);
  const current = typeof value === "string" ? value : "";
  const isDataUrl = /^data:image\//.test(current);

  function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result ?? "");
      if (!url) return;
      onChange(url);
      const asset: Asset = {
        id: uid(),
        url,
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        width: 0,
        height: 0,
      };
      addAssets([asset]);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      {current ? (
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau lokal */}
          <img
            src={current}
            alt={label}
            className="h-12 w-16 shrink-0 rounded-md border border-border object-cover"
          />
          <span className="min-w-0 flex-1 truncate text-[10px] text-muted-foreground">
            {isDataUrl ? "Gambar diunggah — akan masuk folder assets/ saat ekspor." : current}
          </span>
          <button
            type="button"
            title="Ganti dengan placeholder otomatis (mis. inisial nama)"
            aria-label="Ganti dengan placeholder otomatis"
            onClick={() => onChange("")}
            className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <p className="rounded-md border border-dashed border-border bg-muted/30 px-2 py-1.5 text-[10px] leading-4 text-muted-foreground">
          Kosong — komponen memakai placeholder otomatis (inisial nama).
        </p>
      )}
      <div className="flex gap-1.5">
        <label className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2 text-[10px] font-semibold text-foreground transition-colors hover:border-brand/60 hover:bg-brand/5">
          <Upload size={11} className="text-brand" />
          Unggah
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              handleFile(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
        </label>
        <Input
          value={current}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-8 min-w-0 flex-1 text-xs"
        />
      </div>
    </div>
  );
}