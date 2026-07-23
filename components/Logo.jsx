export default function Logo({ variant = "dark" }) {
  const isLight = variant === "light";
  const markLight = "#cccccb";
  const markDark = isLight ? "#e8ebea" : "#364441";
  const markMid = isLight ? "#b2b2b2" : "#999999";
  const wordColor = isLight ? "#f7f6f4" : "#364441";
  const tagColor = isLight ? "rgba(247,246,244,0.72)" : "#999999";

  return (
    <div className="flex items-center gap-3">
      <svg
        width="42"
        height="42"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M12 20 L36 8 L60 20 L60 52 L36 64 L12 52 Z" fill={markLight} />
        <path d="M36 8 L60 20 L60 52 L36 64 Z" fill={markDark} />
        <path d="M12 20 L36 32 L36 64 L12 52 Z" fill={markMid} />
        <path d="M24 30 L36 24 L36 36 L28 40 Z" fill={isLight ? "#ffffff" : "#cccccb"} />
        <path d="M36 24 L48 30 L44 40 L36 36 Z" fill={isLight ? "#364441" : "#2a3533"} />
        <path d="M28 40 L36 36 L36 54 L28 50 Z" fill={markLight} />
        <path d="M36 36 L44 40 L44 50 L36 54 Z" fill={markDark} />
      </svg>
      <div className="leading-none">
        <div
          className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]"
          style={{ color: wordColor }}
        >
          BizGate
        </div>
        <div
          className="mt-1 text-[0.58rem] font-medium uppercase tracking-[0.18em]"
          style={{ color: tagColor }}
        >
          Marketing &amp; Consultancies
        </div>
      </div>
    </div>
  );
}
