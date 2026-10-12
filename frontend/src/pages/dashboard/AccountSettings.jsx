
import { useState } from 'react';

import { AlertTriangle, KeyRound, Save, Trash2, UserRound } from 'lucide-react';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

import { deleteAccount, updateAccount } from '../../api/endpoints.js';

const readAccount = () =>
  JSON.parse(localStorage.getItem('parkease_user') || 'null') || {};

const getErrorMessage = (error, fallback) =>
  typeof error.response?.data === 'string'
    ? error.response.data
    : error.response?.data?.message || error.message || fallback;

export default function AccountSettings() {
  const navigate = useNavigate();

  const [account, setAccount] = useState(readAccount);

  const [form, setForm] = useState({
    name: account.name || '',
    email: account.email || '',
    phone: account.phone || '',
  });

  const [isSaving, setIsSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [activeSetting, setActiveSetting] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const updateField = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const updatePasswordField = (event) => {
    setPasswordForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const saveAccount = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
    };

    if (!payload.name) {
      toast.error('Full name is required.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateAccount(payload);

      const result = response.data;

      const serverAccount =
        result?.user ||
        (result && typeof result === 'object' ? result : {});

      const updatedAccount = {
        ...account,
        name: serverAccount.name || serverAccount.fullName || payload.name,
        email: serverAccount.email || payload.email,
        phone: serverAccount.phone ?? payload.phone,
      };

      localStorage.setItem(
        'parkease_user',
        JSON.stringify(updatedAccount)
      );

      setAccount(updatedAccount);

      setForm({
        name: updatedAccount.name,
        email: updatedAccount.email,
        phone: updatedAccount.phone,
      });

      window.dispatchEvent(new Event('parkease-account-updated'));

      toast.success('Account details updated.');

      setActiveSetting('');
    } catch (error) {
      toast.error(
        getErrorMessage(error, 'Unable to update your account.')
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Backend connection added here. Original confirmation and UI are unchanged.
  const removeAccount = async () => {
    if (deleteConfirmation !== 'DELETE') return;

    const accountId = account.id;

    if (accountId == null) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAccount(accountId);

      localStorage.removeItem('Token');
      localStorage.removeItem('Role');
      localStorage.removeItem('parkease_user');

      toast.success('Your account has been deleted.');

      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(
        getErrorMessage(error, 'Unable to delete your account.')
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsChangingPassword(true);

    try {
      // Keep your existing password API connection here.
      toast.error('Password change API is not connected.');
    } catch (error) {
      toast.error(
        getErrorMessage(error, 'Unable to change your password.')
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <p className="text-sm font-semibold text-blue-700">Account</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Account settings
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Update the details associated with your ParkEase account.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          aria-expanded={activeSetting === 'details'}
          onClick={() =>
            setActiveSetting(activeSetting === 'details' ? '' : 'details')
          }
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md ${
            activeSetting === 'details'
              ? 'border-blue-400 ring-2 ring-blue-100'
              : 'border-slate-200'
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <UserRound size={19} />
          </span>

          <span className="mt-4 block font-semibold text-slate-900">
            Change details
          </span>

          <span className="mt-1 block text-sm text-slate-500">
            Edit your name, email, or phone number.
          </span>
        </button>

        <button
          type="button"
          aria-expanded={activeSetting === 'password'}
          onClick={() =>
            setActiveSetting(activeSetting === 'password' ? '' : 'password')
          }
          className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md ${
            activeSetting === 'password'
              ? 'border-blue-400 ring-2 ring-blue-100'
              : 'border-slate-200'
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <KeyRound size={19} />
          </span>

          <span className="mt-4 block font-semibold text-slate-900">
            Change password
          </span>

          <span className="mt-1 block text-sm text-slate-500">
            Set a new password for your account.
          </span>
        </button>
      </div>

      {activeSetting === 'details' && (
        <form
          onSubmit={saveAccount}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <UserRound size={20} />
            </span>

            <div>
              <h2 className="font-semibold text-slate-900">
                Personal details
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your name, email, and phone number.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="account-name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full name
              </label>

              <input
                id="account-name"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="account-phone"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Phone number
              </label>

              <input
                id="account-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                value={form.phone}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Optional · use 10 digits if provided.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="account-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="account-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      )}

      {activeSetting === 'password' && (
        <form
          onSubmit={savePassword}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <KeyRound size={20} />
            </span>

            <div>
              <h2 className="font-semibold text-slate-900">
                Change password
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose a new password for your account.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="settings-new-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New password
              </label>

              <input
                id="settings-new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={passwordForm.newPassword}
                onChange={updatePasswordField}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Use at least 6 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="settings-confirm-password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm new password
              </label>

              <input
                id="settings-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={passwordForm.confirmPassword}
                onChange={updatePasswordField}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KeyRound size={16} />
              {isChangingPassword ? 'Updating...' : 'Change password'}
            </button>
          </div>
        </form>
      )}

      <section className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700">
            <AlertTriangle size={19} />
          </span>

          <div>
            <h2 className="font-semibold text-slate-900">Delete account</h2>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Permanently delete your account and sign out. This action
              cannot be undone.
            </p>
          </div>
        </div>

        {!showDeleteConfirmation ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirmation(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete my account
          </button>
        ) : (
          <div
            className="mt-5 rounded-xl bg-red-50 p-4"
            role="alertdialog"
            aria-label="Confirm account deletion"
          >
            <p className="text-sm font-semibold text-red-900">
              This cannot be undone.
            </p>

            <p className="mt-1 text-sm text-red-800">
              Type DELETE to confirm you want to permanently delete your account.
            </p>

            <label
              htmlFor="delete-confirmation"
              className="sr-only"
            >
              Type DELETE to confirm
            </label>

            <input
              id="delete-confirmation"
              autoComplete="off"
              value={deleteConfirmation}
              onChange={(event) => setDeleteConfirmation(event.target.value)}
              className="mt-3 w-full rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 sm:max-w-xs"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setDeleteConfirmation('');
                }}
                disabled={isDeleting}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={removeAccount}
                disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                {isDeleting ? 'Deleting...' : 'Permanently delete'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
