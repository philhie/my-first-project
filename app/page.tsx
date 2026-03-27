"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, useRef } from "react";
import SoundToggle from "./components/SoundToggle";
import SoundEngine from "./components/SoundEngine";
import CustomCursor from "./components/CustomCursor";

const Scene = dynamic(() => import("./components/Scene"), { ssr: false });

// Konami code sequence
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export default function Home() {
  const [sceneReady, setSceneReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cursorPos = useRef({ x: 0, y: 0 });

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setShowOverlay(true);
      setSceneReady(true);
    }
  }, []);

  // Show overlay after entrance (4s for first visit, earlier for returning)
  useEffect(() => {
    if (reducedMotion) return;
    const isReturning = (() => {
      try {
        return parseInt(localStorage.getItem("ph-visit") || "0", 10) > 1;
      } catch {
        return false;
      }
    })();
    const delay = isReturning ? 1000 : 3500;
    const timer = setTimeout(() => setShowOverlay(true), delay);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Konami code listener
  useEffect(() => {
    let position = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      if (e.code === KONAMI[position]) {
        position++;
        clearTimeout(timeout);
        timeout = setTimeout(() => { position = 0; }, 2000);
        if (position === KONAMI.length) {
          position = 0;
          window.dispatchEvent(new Event("konami"));
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timeout);
    };
  }, []);

  // Track cursor for sound engine
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      cursorPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleContextLost = useCallback(() => setWebglFailed(true), []);
  const toggleSound = useCallback(() => setSoundEnabled(true), []);

  // Static fallback for WebGL failure or reduced motion without WebGL
  if (webglFailed) {
    return <StaticFallback />;
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* CSS loading glow (visible before canvas mounts) */}
      {!sceneReady && !reducedMotion && (
        <div className="loading-glow" />
      )}

      {/* WebGL Scene */}
      {!reducedMotion && (
        <Scene onReady={handleSceneReady} onContextLost={handleContextLost} />
      )}

      {/* Reduced motion: static particle-like background */}
      {reducedMotion && (
        <div className="fixed inset-0 z-0">
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 60%)",
            }}
          />
        </div>
      )}

      {/* DOM Overlay: name, tagline, links */}
      <div
        className={`fixed z-10 transition-opacity duration-1000 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
        style={{
          bottom: "clamp(2rem, 5vh, 4rem)",
          left: "clamp(1.5rem, 4vw, 3rem)",
          maxWidth: "32rem",
        }}
      >
        <h1
          className="font-sans text-white leading-none"
          style={{
            fontSize: "clamp(4.5rem, 10vw, 10rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
          }}
        >
          Phil Hie
        </h1>

        <p
          className="font-sans text-neutral-400 mt-3"
          style={{
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
          }}
        >
          Building.
        </p>

        <div
          className="flex gap-6 mt-6"
          style={{ flexWrap: "wrap" }}
        >
          <a
            href="https://github.com/philhie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 font-mono text-neutral-500 hover:text-white transition-colors duration-150 uppercase"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              padding: "0.875rem 0",
              minHeight: "44px",
            }}
          >
            GitHub
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-neutral-300">
              ↗
            </span>
          </a>
          <a
            href="https://linkedin.com/in/philhie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 font-mono text-neutral-500 hover:text-white transition-colors duration-150 uppercase"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
              padding: "0.875rem 0",
              minHeight: "44px",
            }}
          >
            LinkedIn
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-neutral-300">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Sound */}
      <SoundToggle enabled={soundEnabled} onToggle={toggleSound} />
      <SoundEngine
        enabled={soundEnabled}
        cursorX={cursorPos.current.x}
        cursorY={cursorPos.current.y}
      />

      {/* Custom cursor */}
      <CustomCursor />
    </div>
  );
}

function StaticFallback() {
  return (
    <div className="flex min-h-screen bg-black">
      <div
        className="fixed z-10"
        style={{
          bottom: "clamp(2rem, 5vh, 4rem)",
          left: "clamp(1.5rem, 4vw, 3rem)",
          maxWidth: "32rem",
        }}
      >
        <h1
          className="font-sans text-white leading-none"
          style={{
            fontSize: "clamp(4.5rem, 10vw, 10rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
          }}
        >
          Phil Hie
        </h1>
        <p
          className="font-sans text-neutral-400 mt-3"
          style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
        >
          Building.
        </p>
        <div className="flex gap-6 mt-6">
          <a
            href="https://github.com/philhie"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-neutral-500 hover:text-white transition-colors duration-150 uppercase"
            style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/philhie"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-neutral-500 hover:text-white transition-colors duration-150 uppercase"
            style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  );
}
