import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ListChecks, CreditCard, Settings, Bell, CarFront, Building2, ShieldCheck, LogOut, UserRound, MapPin } from 'lucide-react';

const readAccount = () => JSON.parse(localStorage.getItem('parkease_user') || 'null');

const navigation = {
  SEEKER: [
    { label: 'Overview', to: '/seeker', icon: LayoutDashboard },
    { label: 'Find parking', to: '/seeker/search', icon: MapPin },
    { label: 'Bookings', to: '/seeker/bookings', icon: ListChecks },
    { label: 'Vehicles', to: '/seeker/vehicles', icon: CarFront },
    { label: 'Payments', to: '/seeker/payments', icon: CreditCard },
    { label: 'Notifications', to: '/seeker/notifications', icon: Bell },
    { label: 'Settings', to: '/seeker/settings', icon: Settings },
  ],
  PROVIDER: [
    { label: 'Overview', to: '/provider', icon: LayoutDashboard },
    { label: 'Listings', to: '/provider/listings', icon: Building2 },
    { label: 'Bookings', to: '/provider/bookings', icon: ListChecks },
    { label: 'Payouts', to: '/provider/payouts', icon: CreditCard },
    { label: 'Settings', to: '/provider/profile', icon: Settings },
  ],
  ADMIN: [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: ShieldCheck },
    { label: 'Listings', to: '/admin/listings', icon: Building2 },
    { label: 'Payments', to: '/admin/payments', icon: CreditCard },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
  ],
};

export default function DashboardLayout({ role = 'SEEKER' }) {
  const navItems = navigation[role] || navigation.SEEKER;
  const navigate = useNavigate();
  const [account, setAccount] = useState(readAccount);
  const email = account?.email || 'Account details unavailable';
  const displayName = account?.name || email.split('@')[0] || 'ParkEase user';

  useEffect(() => {
    const refreshAccount = () => setAccount(readAccount());
    window.addEventListener('parkease-account-updated', refreshAccount);
    return () => window.removeEventListener('parkease-account-updated', refreshAccount);
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    localStorage.removeItem('parkease_user');
    navigate('/login', { replace: true });
  };

  const accountDetails = (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700"><UserRound size={18} /></span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900">{displayName}</p>
        <p className="truncate text-xs text-slate-500">{email}</p>
        {account?.phone && <p className="truncate text-xs text-slate-500">{account.phone}</p>}
        <p className="mt-0.5 text-[11px] font-medium capitalize text-blue-700">{role.toLowerCase()} account</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="flex min-h-[calc(100vh-3rem)] w-64 shrink-0 flex-col self-start rounded-3xl border border-slate-200 bg-white p-4 shadow-sm max-lg:hidden lg:sticky lg:top-6">
          <div className="mb-8 flex items-center gap-3 px-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white">P</span>
            <div>
              <p className="text-lg font-bold text-slate-900">ParkEase</p>
              <p className="text-xs capitalize text-slate-500">{role.toLowerCase()} portal</p>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-slate-100 pt-5">
            {accountDetails}
            <button
              type="button"
              onClick={logout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <nav className="mb-4 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === `/${role.toLowerCase()}`}
                className={({ isActive }) =>
                  `shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:hidden">
            {accountDetails}
            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
          <main className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-6 lg:p-7">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
