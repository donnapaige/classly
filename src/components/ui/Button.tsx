import Link from "next/link";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  icon?: boolean;
  outline?: boolean;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Button({
  variant = "ghost",
  size = "md",
  full = false,
  icon = false,
  outline = false,
  href,
  disabled,
  onClick,
  type = "button",
  children,
  className = "",
  style,
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "",
    full ? "btn-full" : "",
    icon ? "btn-icon" : "",
    outline ? "is-outline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
