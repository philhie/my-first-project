"use client";

export default function SoundToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  if (enabled) return null;

  return (
    <button
      onClick={onToggle}
      className="fixed z-20 font-mono text-neutral-600 hover:text-neutral-400 transition-colors duration-300"
      style={{
        bottom: "clamp(1rem, 2vh, 2rem)",
        right: "clamp(1rem, 3vw, 2.5rem)",
        fontSize: "0.625rem",
        letterSpacing: "0.05em",
        padding: "0.875rem",
        minWidth: "44px",
        minHeight: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Enable sound"
    >
      listen
    </button>
  );
}
