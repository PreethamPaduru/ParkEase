import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ListChecks, CreditCard, Settings, Bell, LogOut, CarFront, Building2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const navigation = {
  SEEKER: [
    { label: 'Overview', to: '/seeker', icon: LayoutDashboard },
    { label: 'Bookings', to: '/seeker/bookings', icon: ListChecks },
    { label: 'Vehicles', to: '/seeker/vehicles', icon: CarFront },
    { label: 'Payments', to: '/seeker/payments', icon: CreditCard },
    { label: 'Notifications', to: '/seeker/notifications', icon: Bell },
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
  const { user, logout } = useAuth();
  const navItems = navigation[role] || navigation.SEEKER;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:block">
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

          <div className="mt-8 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Signed in as</p>
            <p className="mt-1">{user?.name || 'Demo user'}</p>
            <p className="text-xs text-slate-500">{user?.email || 'demo@parkease.in'}</p>
          </div>

          <button
            onClick={logout}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-red-200 hover:text-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
