import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" },
  };
  const s = sizes[size];

  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#087BFF] via-[#00D5FF] to-[#792BFF] p-[2px] transition-transform group-hover:scale-105"
        style={{ width: s.icon, height: s.icon }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#050505]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-[60%] w-[60%]"
            aria-hidden
          >
            <path
              d="M12 2L4 7v10l8 5 8-5V7l-8-5z"
              stroke="url(#logoGrad)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M12 8v8M8 12h8"
              stroke="url(#logoGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#087BFF" />
                <stop offset="50%" stopColor="#00D5FF" />
                <stop offset="100%" stopColor="#792BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`font-semibold tracking-tight ${s.text}`}>
          <span className="text-white">Market</span>
          <span className="gradient-text">Pilot</span>
          <span className="text-muted text-sm ml-1 font-normal">AI</span>
        </span>
      )}
    </Link>
  );
}
