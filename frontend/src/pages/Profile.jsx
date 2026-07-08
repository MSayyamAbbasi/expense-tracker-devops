import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import userService from '../services/userService';

const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
  { value: 'PKR', label: 'PKR — Pakistani Rupee' },
  { value: 'INR', label: 'INR — Indian Rupee' },
  { value: 'AED', label: 'AED — UAE Dirham' },
  { value: 'CAD', label: 'CAD — Canadian Dollar' },
  { value: 'AUD', label: 'AUD — Australian Dollar' },
];

const Profile = () => {
  const { user, updateUserInContext } = useAuth();
  const { success, error: toastError } = useToast();

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      currency: user?.currency || 'USD',
    },
  });

  const passwordForm = useForm();
  const newPassword = passwordForm.watch('newPassword');

  const onProfileSubmit = async (values) => {
    setSavingProfile(true);
    try {
      const { user: updated } = await userService.updateProfile(values);
      updateUserInContext(updated);
      success('Profile updated successfully');
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const onPasswordSubmit = async (values) => {
    setSavingPassword(true);
    try {
      await userService.changePassword(values);
      success('Password changed successfully');
      passwordForm.reset();
    } catch (err) {
      toastError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  const initials = (user?.name || '?')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style={{ backgroundColor: user?.avatarColor || '#6366F1' }}
        >
          {initials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-ink-900">{user?.name}</h2>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-1 text-base font-semibold text-ink-900">Profile details</h3>
        <p className="mb-5 text-xs text-slate-400">Update your name, email, and preferred currency.</p>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <Input
            label="Full name"
            id="profile-name"
            error={profileForm.formState.errors.name?.message}
            {...profileForm.register('name', {
              required: 'Name is required',
              maxLength: { value: 60, message: 'Name cannot exceed 60 characters' },
            })}
          />
          <Input
            label="Email"
            id="profile-email"
            type="email"
            error={profileForm.formState.errors.email?.message}
            {...profileForm.register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
            })}
          />
          <Select
            label="Preferred currency"
            id="profile-currency"
            options={CURRENCY_OPTIONS}
            {...profileForm.register('currency')}
          />

          <div className="flex justify-end pt-1">
            <Button type="submit" loading={savingProfile}>
              Save changes
            </Button>
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="mb-1 text-base font-semibold text-ink-900">Change password</h3>
        <p className="mb-5 text-xs text-slate-400">Use a strong password you don&apos;t use elsewhere.</p>

        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current password"
            id="currentPassword"
            type="password"
            error={passwordForm.formState.errors.currentPassword?.message}
            {...passwordForm.register('currentPassword', {
              required: 'Current password is required',
            })}
          />
          <Input
            label="New password"
            id="newPassword"
            type="password"
            error={passwordForm.formState.errors.newPassword?.message}
            {...passwordForm.register('newPassword', {
              required: 'New password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          <Input
            label="Confirm new password"
            id="confirmNewPassword"
            type="password"
            error={passwordForm.formState.errors.confirmNewPassword?.message}
            {...passwordForm.register('confirmNewPassword', {
              required: 'Please confirm your new password',
              validate: (value) => value === newPassword || 'Passwords do not match',
            })}
          />

          <div className="flex justify-end pt-1">
            <Button type="submit" variant="secondary" loading={savingPassword}>
              Update password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
