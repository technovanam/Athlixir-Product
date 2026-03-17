import Link from "next/link";

export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95 duration-200"
    >
      {/* Logo Icon - Stylized "A" */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Triangle/Mountain shape */}
          <path
            d="M20 4L36 36H4L20 4Z"
            className="fill-primary transition-all duration-300"
          />
          {/* Inner cutout for the "A" effect */}
          <path
            d="M20 16L26 28H14L20 16Z"
            className="fill-surface-1"
          />
          {/* Horizontal bar of the "A" */}
          <rect
            x="12"
            y="24"
            width="16"
            height="3"
            className="fill-surface-1"
          />
        </svg>
      </div>
      
      {/* Logo Text */}
      <span className="text-2xl font-bold tracking-tight">
        <span className="text-white">ATHL</span>
        <span className="text-primary">IXIR</span>
      </span>
    </Link>
  );
}
