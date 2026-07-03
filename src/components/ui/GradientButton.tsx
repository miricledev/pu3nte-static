import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function GradientButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }>) {
  const styles =
    variant === "primary"
      ? "bg-bridge text-pu3nte-bg shadow-glow"
      : variant === "danger"
        ? "border border-pu3nte-error/50 bg-pu3nte-error/10 text-pu3nte-text"
        : "border border-white/10 bg-white/[0.04] text-pu3nte-text hover:bg-white/[0.08]";
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
