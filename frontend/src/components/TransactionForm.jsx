import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { CATEGORIES } from '../utils/constants';

const TYPE_OPTIONS = [
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

const toDateInputValue = (date) => {
  const d = date ? new Date(date) : new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
};

/**
 * Shared form for creating and editing a transaction. When `initialData`
 * is provided the form is pre-filled and submits as an edit.
 */
const TransactionForm = ({ initialData, onSubmit, onCancel, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: initialData?.type || 'expense',
      amount: initialData?.amount || '',
      category: initialData?.category || '',
      note: initialData?.note || '',
      date: toDateInputValue(initialData?.date),
    },
  });

  useEffect(() => {
    reset({
      type: initialData?.type || 'expense',
      amount: initialData?.amount || '',
      category: initialData?.category || '',
      note: initialData?.note || '',
      date: toDateInputValue(initialData?.date),
    });
  }, [initialData, reset]);

  const submitHandler = (formValues) => {
    onSubmit({
      ...formValues,
      amount: parseFloat(formValues.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Type"
          id="type"
          options={TYPE_OPTIONS}
          placeholder="Select type"
          error={errors.type?.message}
          {...register('type', { required: 'Type is required' })}
        />
        <Input
          label="Amount"
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          error={errors.amount?.message}
          {...register('amount', {
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' },
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Category"
          id="category"
          options={CATEGORY_OPTIONS}
          placeholder="Select category"
          error={errors.category?.message}
          {...register('category', { required: 'Category is required' })}
        />
        <Input
          label="Date"
          id="date"
          type="date"
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />
      </div>

      <div>
        <label htmlFor="note" className="label-text">
          Note <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="note"
          rows={3}
          placeholder="e.g. Weekly grocery run"
          className={`input-field resize-none ${errors.note ? 'border-expense-500' : ''}`}
          {...register('note', { maxLength: { value: 500, message: 'Note is too long' } })}
        />
        {errors.note && <p className="form-error">{errors.note.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={submitting}>
          {initialData ? 'Save changes' : 'Add transaction'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
