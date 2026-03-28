import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-3xl border border-white/10 bg-neutral-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-white/30 focus:ring-2 focus:ring-white/10",
        className,
      )}
      {...props}
    />
  );
}
