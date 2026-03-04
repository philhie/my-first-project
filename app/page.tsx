export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <main className="flex flex-col gap-8 px-8 py-20 max-w-xl w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Phil Hie
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Building at the intersection services and artificial intelligence. Currently Founders Associate at Avelios Medical. On a mission to build something big.
          </p>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/philhie" target="_blank" className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/" target="_blank" className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300 transition-colors">
            LinkedIn
          </a>
        </div>
      </main>
    </div>
  );
}