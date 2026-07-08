import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';

/**
 * Confirmation dialog used before destructive actions (e.g. deleting
 * a transaction), so a click can't be undone accidentally.
 */
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Delete',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-expense-500/10 text-expense-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
