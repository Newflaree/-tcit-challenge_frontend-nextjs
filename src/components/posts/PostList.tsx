import { EmptyState } from "@/components/ui/Alert";
import { ErrorState } from "@/components/ui/Alert";
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
  emptyTitle = "No hay posts",
  emptyDescription = "Crea el primero para empezar.",
}: PostListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner label="Cargando posts" />
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
