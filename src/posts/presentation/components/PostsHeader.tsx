export function PostsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-[11px] font-bold text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            T
          </span>
          <p className="text-sm tracking-tight">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              TCIT
            </span>{" "}
            <span className="font-normal text-zinc-400">Posts</span>
          </p>
        </div>
        <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          demo full-stack
        </span>
      </div>
    </header>
  );
}
