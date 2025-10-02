"use client";
import Providers from "@/app/Providers";
import DebugPanel from "@/ui/DebugPanel";
import { usePlayer } from "@/state/player.slice";
import { useWorld } from "@/state/world.slice";

export default function Home() {
  const pos = usePlayer((s) => s.position);
  const zone = useWorld((s) => s.currentZone);

  return (
    <Providers>
      <main style={{ padding: 20 }}>
        <h1>EPSI – La Soutenance (MVP)</h1>
        <p>
          Position joueur: {pos.x},{pos.y} • Zone: {zone}
        </p>
        <DebugPanel />
      </main>
    </Providers>
  );
}
