import { GradientButton } from "./GradientButton";

export function ConfirmModal({
  open,
  title,
  body,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="glass-panel max-w-md rounded-lg p-6">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-3 text-sm text-pu3nte-secondary">{body}</p>
        <div className="mt-6 flex justify-end gap-3">
          <GradientButton variant="ghost" onClick={onCancel}>Cancel</GradientButton>
          <GradientButton variant="danger" onClick={onConfirm}>Confirm</GradientButton>
        </div>
      </div>
    </div>
  );
}
