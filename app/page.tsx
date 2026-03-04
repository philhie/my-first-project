export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex flex-col gap-12 px-8 py-20 max-w-lg w-full">

        {/* Monogram */}
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white text-black text-sm font-semibold tracking-tight select-none">
          ph
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-neutral-500 tracking-wider uppercase">
              Founders Associate · Avelios Medical
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white leading-none">
            Phil Hie
          </h1>

          <p className="text-base text-neutral-400 leading-relaxed">
            Building at the intersection of services and artificial intelligence.
            On a mission to build something big.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a
            href="https://github.com/philhie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 text-sm text-neutral-500 hover:text-white transition-colors duration-150"
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
            className="group flex items-center gap-1 text-sm text-neutral-500 hover:text-white transition-colors duration-150"
          >
            LinkedIn
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-neutral-300">
              ↗
            </span>
          </a>
        </div>

      </main>
    </div>
  );
}
