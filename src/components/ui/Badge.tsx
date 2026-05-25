import type { TagVariant } from "@/types";

interface BadgeProps {
  variant?: TagVariant;
  outline?: boolean;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "gray",
  outline = false,
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  const classes = [
    "tag",
    `tag-${variant}`,
    outline ? "tag-outline" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {dot && <span className="dot" />}
      {children}
    </span>
  );
}
