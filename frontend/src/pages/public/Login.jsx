import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post(
        'http://localhost:9091/parking/login',
        {
          email: values.email,
          password: values.password,
        }
      );

      // Get token and role from backend JSON
      const { token } = response.data;
      const role = String(response.data.role || '').toUpperCase();

      if (!token || !role) {
        toast.error('Invalid response from server');
        return;
      }

      // Save token and role
      localStorage.setItem('Token', token);
      localStorage.setItem('Role', role);
      const account = response.data.user || response.data;
      localStorage.setItem('parkease_user', JSON.stringify({
        name: account.name || account.fullName || account.username || '',
        email: account.email || values.email,
        phone: account.phone || '',
        role,
      }));

      toast.success('User Login Success!');

      // Redirect according to role
      if (role === 'SEEKER') {
        const returnTo = location.state?.returnTo;
        navigate(returnTo?.startsWith('/seeker/') ? returnTo : '/seeker', { replace: true });
      } else if (role === 'PROVIDER') {
        navigate('/provider', { replace: true });
      } else if (role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        localStorage.removeItem('Token');
        localStorage.removeItem('Role');
        localStorage.removeItem('parkease_user');
        toast.error('Invalid user role');
      }
    } catch (error) {
      toast.error(
        typeof error.response?.data === 'string'
          ? error.response.data
          : error.response?.data?.message ||
            'Email or Password Incorrect'
      );
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="max-w-xl">
        <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
          ParkEase
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Park smarter, every day.
        </h1>

        <p className="mt-4 text-base text-slate-600">
          Book trusted parking, list your space, and manage bookings
          from one secure platform built for modern cities.
        </p>
      </div>

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/60">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Welcome back
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign in to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register('email', {
                required: 'Email is required',
              })}
            />

            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              {...register('password', {
                required: 'Password is required',
              })}
            />

            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          No account yet?{' '}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
