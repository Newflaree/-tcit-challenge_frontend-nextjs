export const controlBase =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 shadow-xs outline-none transition placeholder:text-zinc-400 focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500";

export const controlTone = (error?: string) =>
  error
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 dark:border-red-900 dark:focus:border-red-700 dark:focus:ring-red-500/10"
    : "border-zinc-200 focus:border-zinc-400 focus:ring-zinc-900/[0.06] dark:border-zinc-800 dark:focus:border-zinc-600 dark:focus:ring-zinc-100/[0.08]";
