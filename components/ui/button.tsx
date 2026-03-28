import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = {
  primary:
    "bg-white text-neutral-950 shadow-[0_12px_30px_rgba(255,255,255,0.12)] hover:bg-neutral-200",
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
