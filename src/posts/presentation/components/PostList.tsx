import { EmptyState, ErrorState } from "@/shared/components/ui/Alert";
import { Spinner } from "@/shared/components/ui/Spinner";
import { PostCard } from "@/shared/components/ui/PostCard";

export interface PostListPost {
  id: number;
  name: string;
  description: string;
}

export interface PostListProps {
  posts: PostListPost[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onDelete?: (id: number) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function PostList({
  posts,
  loading = false,
  error,
  onRetry,
  onDelete,
  emptyTitle = "Todavía no hay posts",
  emptyDescription = "Estrena el muro: crea tu primer post arriba y aparecerá aquí al instante.",
}: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-zinc-400">
        <Spinner label="Cargando posts" />
        <p className="text-xs font-medium">Preparando el hilo…</p>
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (posts.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white px-4 shadow-sm divide-y divide-zinc-100 dark:divide-zinc-800/70 dark:border-zinc-800 dark:bg-zinc-900 sm:px-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          name={post.name}
          description={post.description}
          onDelete={onDelete ? () => onDelete(post.id) : undefined}
        />
      ))}
    </div>
  );
}
