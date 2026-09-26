import Link from "next/link";
import { Header } from "./Header";

export function PageHero({
  title,
  kicker,
  image,
  tone = "#3F4636",
}: {
  title: string;
  kicker?: string;
  image?: string;
  tone?: string;
}) {
  return (
    <section
      className="relative flex min-h-[58vh] flex-col justify-end overflow-hidden pt-28 pb-16 md:min-h-[68vh]"
      style={{
        backgroundColor: tone,
        backgroundImage: image
          ? `linear-gradient(180deg, rgba(20,18,16,0.25) 0%, rgba(20,18,16,0.45) 100%), url(${image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header overlay />
      <div className="absolute inset-x-0 top-10 px-2 text-center md:top-8">
        <Link
          href="/"
          className="editorial block select-none text-[18vw] font-medium leading-[0.8] tracking-[-0.03em] text-[#f3eee6]/90 md:text-[12.5vw]"
        >
          KANSOTX
        </Link>
      </div>
      <div className="relative z-10 mx-auto mt-24 max-w-xl px-6 text-center text-[#f3eee6]">
        {kicker ? (
          <p className="mb-3 text-[11px] uppercase tracking-[0.42em]">{kicker}</p>
        ) : null}
        <h1 className="font-sans text-[13px] uppercase tracking-[0.38em] md:text-[15px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
