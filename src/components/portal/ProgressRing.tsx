interface ProgressRingProps {
  percent: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * Circular SVG progress ring — used on timeline cards and the progress page.
 * Renders server-side (no hooks).
 */
export function ProgressRing({
  percent,
  color = "var(--accent)",
  size = 36,
  strokeWidth = 3,
}: ProgressRingProps) {
  const r = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circumference * (1 - clamped / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.22}
        strokeWidth={strokeWidth}
      />
      {/* Fill */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${cx} ${cx})`}
      />
    </svg>
  );
}
