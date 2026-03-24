import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT · Phil Hie",
  description: "IT and technology services by Phil Hie.",
};

export default function ITPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex flex-col gap-10 px-6 py-16 sm:px-8 sm:py-20 max-w-lg w-full">

        {/* Monogram */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-black text-sm font-semibold tracking-tight select-none">
          it
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
            <span className="text-xs font-mono text-neutral-500 tracking-wider uppercase leading-relaxed">
              IT &amp; Technology
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-none">
            IT Services
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Technology consulting, infrastructure, and digital solutions.
            Helping businesses leverage modern technology to scale.
          </p>
        </div>

        {/* Back link */}
        <div className="flex gap-6">
          <a
            href="https://philhie.com"
            className="group flex items-center gap-1 text-sm text-neutral-500 hover:text-white transition-colors duration-150"
          >
            philhie.com
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-neutral-300">
              ↗
            </span>
          </a>
        </div>

      </main>
    </div>
  );
}
