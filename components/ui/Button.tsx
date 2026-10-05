import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "dark";
  className?: string;
  type?: "button" | "submit";
};

export function Button({ children, href, variant = "primary", className = "", type = "button" }: Props) {
  const styles = {
    primary: "bg-[#087FF5] text-white shadow-[0_7px_18px_rgba(8,127,245,.22)] hover:bg-[#0874df]",
    outline: "border border-[#087FF5] text-[#087FF5] bg-white hover:bg-[#EEF8FF]",
    dark: "bg-[#071B3A] text-white hover:bg-[#102b53]"
  }[variant];

  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${styles} ${className}`;

  return href ? <Link href={href} className={classes}>{children}</Link> : <button type={type} className={classes}>{children}</button>;
}
