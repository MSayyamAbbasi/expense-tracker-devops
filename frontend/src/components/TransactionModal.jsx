import Modal from './Modal';
import TransactionForm from './TransactionForm';

const TransactionModal = ({ isOpen, onClose, initialData, onSubmit, submitting }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit transaction' : 'Add transaction'}
    >
      <TransactionForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onClose}
        submitting={submitting}
      />
    </Modal>
  );
};

export default TransactionModal;
