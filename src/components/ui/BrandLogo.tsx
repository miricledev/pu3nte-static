import logoUrl from "../../../images/puente_logo.png";

export function BrandLogo({ size = "header" }: { size?: "header" | "hero" }) {
  const dimensions = size === "hero" ? "h-20 sm:h-28 lg:h-32" : "h-9 sm:h-11";

  return (
    <img
      src={logoUrl}
      alt="PU3NTE"
      className={`${dimensions} w-auto object-contain drop-shadow-[0_0_22px_rgba(0,200,255,0.18)]`}
    />
  );
}
