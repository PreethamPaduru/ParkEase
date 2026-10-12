import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';

export default function Register() {
  const navigate = useNavigate();

  const { 
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { role: 'SEEKER' },
  });

  const password = watch('password');

  const onSubmit = async (values) => {
    try {
      const response = await api.post(
        '/parking/register',
        {
          name: values.name,
          phone: values.phone,
          email: values.email,
          password: values.password,
          role: values.role,
        }
      );

      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Failed to create account. Please try again.'
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          Join ParkEase
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('name', {
                  required: 'Full name is required',
                })}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Enter a valid 10-digit phone number',
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Choose your role
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              {['SEEKER', 'PROVIDER'].map((role) => (
                <label key={role} className="cursor-pointer">
                  <input
                    type="radio"
                    value={role}
                    {...register('role', { required: true })}
                    className="sr-only"
                  />

                  <div
                    className={`rounded-2xl border p-4 transition ${
                      watch('role') === role
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-base font-semibold text-slate-900">
                      {role === 'SEEKER' ? 'Seeker' : 'Provider'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {role === 'SEEKER'
                        ? 'Find and book spaces'
                        : 'List your parking and earn'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
