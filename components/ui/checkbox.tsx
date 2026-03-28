import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      className={cn(
        "h-5 w-5 rounded border border-white/15 bg-neutral-950 text-white accent-white focus:ring-2 focus:ring-white/20",
        className,
      )}
      type="checkbox"
      {...props}
    />
  );
}
