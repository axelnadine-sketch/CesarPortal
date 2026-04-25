import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = {
 primary:
  "border border-[#007acc]/40 bg-[#007acc]/20 text-[#cfe8ff] shadow-[0_0_24px_rgba(56,189,248,0.16)] hover:bg-[#007acc]/30",
  secondary:
    "border border-white/12 bg-white/6 text-white hover:bg-white/10",
  ghost: "text-white/80 hover:bg-white/8 hover:text-white",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof buttonVariants;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-60";

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return <button className={cn(baseClassName, buttonVariants[variant], className)} type={type} {...props} />;
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={cn(baseClassName, buttonVariants[variant], className)} href={href}>
      {children}
    </Link>
  );
}
