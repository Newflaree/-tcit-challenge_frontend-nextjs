export const controlBase =
  "w-full rounded-md border bg-[#fdfdfc] px-3 py-2.5 font-sans text-sm text-zinc-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] outline-none transition placeholder:font-serif placeholder:italic placeholder:text-zinc-400 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500";

export const controlTone = (error?: string) =>
  error
    ? "border-red-400 focus:border-red-500 focus:ring-red-500/15 dark:border-red-800"
    : "border-zinc-300 focus:border-zinc-500 focus:ring-zinc-900/10 dark:border-zinc-700 dark:focus:border-zinc-500 dark:focus:ring-zinc-100/10";
