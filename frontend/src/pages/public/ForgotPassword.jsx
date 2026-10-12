import { useState } from 'react';
import { ArrowLeft, KeyRound, MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import {
//   requestPasswordReset,
//   resetPassword,
//   verifyPasswordResetCode,
// } from '../../api/endpoints.js';

const getErrorMessage = (error, fallback) =>
  typeof error.response?.data === 'string'
    ? error.response.data
    : error.response?.data?.message || error.message || fallback;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const sendCode = async (event) => {
    event?.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    setIsSending(true);
    try {
      await requestPasswordReset(normalizedEmail);
      setEmail(normalizedEmail);
      setCodeSent(true);
      setCodeVerified(false);
      setCode('');
      toast.success('If an account exists for that email, a reset code has been sent.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to send a reset code. Please try again.'));
    } finally {
      setIsSending(false);
    }
  };

  const verifyCode = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    try {
      await verifyPasswordResetCode({
        email: email.trim().toLowerCase(),
        code: code.trim(),
      });
      setCodeVerified(true);
      toast.success('Code verified. Choose a new password.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'That code is invalid or expired. Please try again.'));
    } finally {
      setIsVerifying(false);
    }
  };

  const submitReset = async (event) => {
    event.preventDefault();
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsResetting(true);
    try {
      await resetPassword({
        email: email.trim().toLowerCase(),
        code: code.trim(),
        newPassword,
      });
      toast.success('Password reset successfully. You can now sign in.');
      setCode('');
      setNewPassword('');
      setConfirmPassword('');
      setCodeSent(false);
      setCodeVerified(false);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Unable to reset your password. Check the code and try again.'));
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60 sm:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          {codeSent ? <KeyRound size={22} /> : <MailCheck size={22} />}
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          {codeVerified ? 'Choose a new password' : codeSent ? 'Verify your code' : 'Forgot your password?'}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {codeSent
            ? codeVerified
              ? `Your code for ${email} is verified. Set a new password below.`
              : `Enter the code sent to ${email}.`
            : 'Enter your account email and we will send you a password reset code.'}
        </p>

        {!codeSent ? (
          <form onSubmit={sendCode} className="mt-6 space-y-5">
            <div>
              <label htmlFor="reset-email" className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? 'Sending code...' : 'Send reset code'}
            </button>
          </form>
        ) : !codeVerified ? (
          <form onSubmit={verifyCode} className="mt-6 space-y-5">
            <div>
              <label htmlFor="reset-code" className="mb-2 block text-sm font-medium text-slate-700">Email verification code</label>
              <input
                id="reset-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isVerifying ? 'Verifying code...' : 'Verify code'}
            </button>
            <button
              type="button"
              onClick={sendCode}
              disabled={isSending}
              className="w-full text-sm font-semibold text-blue-700 hover:text-blue-800 disabled:opacity-60"
            >
              {isSending ? 'Sending code...' : 'Resend code'}
            </button>
          </form>
        ) : (
          <form onSubmit={submitReset} className="mt-6 space-y-5">
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-slate-700">New password</label>
              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <p className="mt-1.5 text-xs text-slate-500">Use at least 6 characters.</p>
            </div>
            <div>
              <label htmlFor="confirm-new-password" className="mb-2 block text-sm font-medium text-slate-700">Confirm new password</label>
              <input
                id="confirm-new-password"
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={isResetting}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isResetting ? 'Updating password...' : 'Reset password'}
            </button>
          </form>
        )}

        <Link to="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </section>
    </div>
  );
}
