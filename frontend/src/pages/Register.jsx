import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const Register = () => {
  const { register: registerUser } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await registerUser(payload);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toastError(err.response?.data?.message || 'Could not create your account');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">Create your account</h2>
      <p className="mt-1.5 text-sm text-slate-500">Start tracking your income and expenses in minutes.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
        <Input
          label="Full name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            maxLength: { value: 60, message: 'Name cannot exceed 60 characters' },
          })}
        />
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
          })}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
        />
        <Input
          label="Confirm password"
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
