export function PostsHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-[#faf9f6]/95 backdrop-blur-md dark:border-zinc-100 dark:bg-zinc-950/95">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-baseline gap-2">
          <h1 className="font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            TCIT
            <span className="ml-1.5 font-sans text-sm font-normal tracking-wide text-zinc-500 dark:text-zinc-400">
              Posts
            </span>
          </h1>
        </div>
        <span className="hidden rounded-full border border-zinc-300 px-2.5 py-0.5 font-sans text-[10px] font-medium uppercase tracking-widest text-zinc-500 sm:inline-block dark:border-zinc-700 dark:text-zinc-400">
          Demo full-stack
        </span>
      </div>
    </header>
  );
}
