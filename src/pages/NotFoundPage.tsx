import { Compass } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { BrandLogo } from "../components/ui/BrandLogo";
import { BridgeDivider } from "../components/ui/BridgeDivider";
import { GlassCard } from "../components/ui/GlassCard";

export function NotFoundPage() {
  return (
    <PageContainer className="grid min-h-screen place-items-center">
      <GlassCard className="w-full max-w-2xl text-center">
        <div className="flex justify-center">
          <BrandLogo size="hero" />
        </div>
        <BridgeDivider />
        <Compass className="mx-auto text-pu3nte-cyan" size={42} />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.24em] text-pu3nte-secondary">404 · Activity link not found</p>
        <h1 className="mt-3 text-2xl font-extrabold uppercase tracking-[0.06em] sm:text-5xl">This lesson link is not active.</h1>
        <p className="mx-auto mt-4 max-w-lg text-pu3nte-secondary">
          PU3NTE activities are opened from specific Skool lesson links. Check the URL in Skool or ask for the correct activity link.
        </p>
      </GlassCard>
    </PageContainer>
  );
}
