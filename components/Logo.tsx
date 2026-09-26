import Image from "next/image";

export function Mark({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/icon-kansotex.png"
        alt="Kansotex Icon"
        fill
        className="object-contain"
      />
    </div>
  );
}

export function Wordmark({
  className = "h-12 w-48 md:h-16 md:w-64",
  centered = false,
}: {
  className?: string;
  centered?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo-kansotex.png"
        alt="Kansotex In & Outdoor"
        fill
        className={`object-contain ${centered ? "object-center" : "object-left"}`}
      />
    </div>
  );
}
