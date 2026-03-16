import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b border-border-primary bg-bg-page px-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="font-mono text-xl font-bold text-accent-green leading-none">
          {">"}
        </span>
        <span className="font-mono text-lg font-medium text-text-primary leading-none">
          devroast
        </span>
      </Link>

      {/* Nav Items */}
      <div className="flex items-center gap-6">
        <Link 
          href="/leaderboard" 
          className="font-mono text-[13px] text-text-secondary hover:text-text-primary transition-colors"
        >
          leaderboard
        </Link>
      </div>
    </nav>
  );
}
