import Link from "next/link";

export function UnderlineLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block text-[11px] uppercase tracking-[0.28em] underline decoration-[0.7px] underline-offset-[10px] transition-opacity hover:opacity-60 ${
        light ? "text-[#f3eee6]" : "text-[#1c1b19]"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
