import { forwardRef } from 'react';

/**
 * Reusable text input designed to work with react-hook-form's register().
 * Forwards the ref so RHF can control the field.
 */
const Input = forwardRef(({ label, error, id, className = '', ...rest }, ref) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-text">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        className={`input-field ${error ? 'border-expense-500 focus:border-expense-500' : ''}`}
        {...rest}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
