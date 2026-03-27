"use client";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { Vector2 } from "three";
import ParticleField from "./ParticleField";

type QualityTier = "high" | "medium" | "low";

export default function Scene({
  onReady,
  onContextLost,
}: {
  onReady?: () => void;
  onContextLost?: () => void;
}) {
  const [quality, setQuality] = useState<QualityTier>("high");

  const desktopSubscribe = useCallback(() => () => {}, []);
  const desktopSnapshot = useCallback(() => typeof window !== "undefined" && window.innerWidth > 768, []);
  const isDesktop = useSyncExternalStore(desktopSubscribe, desktopSnapshot, () => true);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const handleDecline = useCallback(() => {
    setQuality((prev) => {
      if (prev === "high") return "medium";
      if (prev === "medium") return "low";
      return "low";
    });
  }, []);

  const handleIncline = useCallback(() => {
    setQuality((prev) => {
      if (prev === "low") return "medium";
      if (prev === "medium") return "high";
      return "high";
    });
  }, []);

  const particleCount =
    quality === "high" ? (isDesktop ? 2000 : 800) :
    quality === "medium" ? (isDesktop ? 800 : 400) :
    400;

  const showBloom = quality !== "low";
  const showChromatic = isDesktop && quality === "high";

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: false,
      }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onContextLost?.();
        });
      }}
    >
      <PerformanceMonitor
        onDecline={handleDecline}
        onIncline={handleIncline}
        flipflops={3}
        onFallback={() => setQuality("low")}
      >
        <ParticleField count={particleCount} />
        <EffectComposer>
          <Bloom
            intensity={showBloom ? (isDesktop ? 1.5 : 0.8) : 0}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            offset={showChromatic ? new Vector2(0.0005, 0.0005) : new Vector2(0, 0)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette darkness={0.7} offset={0.3} />
          <Noise
            blendFunction={BlendFunction.SOFT_LIGHT}
            opacity={0.15}
          />
        </EffectComposer>
      </PerformanceMonitor>
    </Canvas>
  );
}
