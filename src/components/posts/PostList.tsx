import { EmptyState, ErrorState } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { PostCard } from "@/components/ui/PostCard";

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
  emptyDescription = "Estrena el muro: crea tu primer post en el panel de la izquierda y aparecerá aquí al instante.",
}: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-zinc-400">
        <Spinner label="Cargando posts" />
        <p className="text-xs font-medium">Preparando el muro…</p>
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
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
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
