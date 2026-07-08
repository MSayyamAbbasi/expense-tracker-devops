import { forwardRef } from 'react';

/**
 * Reusable select dropdown designed to work with react-hook-form's register().
 */
const Select = forwardRef(
  ({ label, error, id, options = [], placeholder = 'Select...', className = '', ...rest }, ref) => {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={id} className="label-text">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={`input-field ${error ? 'border-expense-500 focus:border-expense-500' : ''}`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
