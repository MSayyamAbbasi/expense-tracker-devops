import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const Login = () => {
  const { login } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await login(formData);
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toastError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">Welcome back</h2>
      <p className="mt-1.5 text-sm text-slate-500">Log in to keep tracking your finances.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
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
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          Log in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
