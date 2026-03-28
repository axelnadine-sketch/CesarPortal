import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-neutral-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-white/30 focus:ring-2 focus:ring-white/10",
        className,
      )}
      {...props}
    />
  );
}
