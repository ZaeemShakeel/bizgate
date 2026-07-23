import Image from "next/image";

export default function Logo({ variant = "dark" }) {
  const isLight = variant === "light";

  return (
    <div className="relative h-10 w-[150px] sm:h-11 sm:w-[168px]">
      <Image
        src="/logo-transparent.png"
        alt="BizGate Marketing & Consultancies"
        fill
        priority
        className={`object-contain object-left ${
          isLight ? "brightness-0 invert" : "brightness-[0.2]"
        }`}
        sizes="168px"
      />
    </div>
  );
}
