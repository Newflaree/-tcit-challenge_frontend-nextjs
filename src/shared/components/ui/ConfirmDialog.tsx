import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/lib/cn";
import { useConfirmDialog } from "./useConfirmDialog";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
  confirmLoading?: boolean;
  className?: string;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  confirmDisabled = false,
  confirmLoading = false,
  className,
}: ConfirmDialogProps) {
  const cancelRef = useConfirmDialog(open, onCancel);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby={description ? "confirm-dialog-desc" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 p-4 backdrop-blur-sm dark:bg-zinc-950/80"
    >
      <div
        className={cn(
          "w-full max-w-md border border-zinc-300 bg-[#fdfdfc] p-6 shadow-xl rounded-md dark:border-zinc-700 dark:bg-zinc-900",
          className,
        )}
      >
        <h2
          id="confirm-dialog-title"
          className="font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {title}
        </h2>
        {description ? (
          <p
            id="confirm-dialog-desc"
            className="mt-2 font-serif text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            {description}
          </p>
        ) : null}
        <div className="mt-6 flex justify-end gap-2 border-t border-zinc-200 pt-5 dark:border-zinc-800">
          <Button
            ref={cancelRef}
            variant="secondary"
            onClick={onCancel}
            disabled={confirmLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={confirmDisabled}
            loading={confirmLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { PageHeader } from "./PageHeader";
