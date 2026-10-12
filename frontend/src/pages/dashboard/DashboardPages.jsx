import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CarFront,
  CheckCircle2,
  CircleParking,
  Clock3,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AccountSettings from './AccountSettings.jsx';
import {
  ParkingSearchPage,
  ProviderListingsPage,
  ProviderRequestsPage,
  SeekerBookingsPage,
} from './MarketplacePages.jsx';

const roleDetails = {
  SEEKER: {
    title: 'Your parking, made simple',
    subtitle: 'Keep track of your bookings, vehicles, and favorite parking spots.',
    sections: {
      bookings: ['My bookings', 'View upcoming and past parking reservations.'],
      search: ['Find parking', 'Search parking offers near the location you need.'],
      vehicles: ['My vehicles', 'Manage the vehicles you use when making a booking.'],
      payments: ['Payments', 'Review payment history and saved payment methods.'],
      notifications: ['Notifications', 'Stay up to date with booking and account updates.'],
      settings: ['Account settings', 'Update your personal details or delete your account.'],
    },
  },
  PROVIDER: {
    title: 'Your spaces at a glance',
    subtitle: 'Manage your parking spaces and keep an eye on bookings and earnings.',
    sections: {
      listings: ['My listings', 'Manage the parking spaces you offer to drivers.'],
      bookings: ['Bookings', 'Review reservations made at your parking spaces.'],
      payouts: ['Payouts', 'Review your earnings and payout history.'],
      profile: ['Account settings', 'Update your personal details or delete your account.'],
    },
  },
  ADMIN: {
    title: 'ParkEase overview',
    subtitle: 'A central view of marketplace activity and platform operations.',
    sections: {
      users: ['Users', 'Review and manage seeker, provider, and admin accounts.'],
      listings: ['Listings', 'Review parking listings across the marketplace.'],
      payments: ['Payments', 'Monitor marketplace transactions and payment activity.'],
      settings: ['Account settings', 'Update your personal details or delete your account.'],
    },
  },
};

const previews = {
  SEEKER: {
    stats: [
      { label: 'Upcoming bookings', value: '2', detail: '1 this week', icon: CalendarDays, color: 'blue' },
      { label: 'Hours parked', value: '18.5', detail: 'Across 6 visits', icon: Clock3, color: 'violet' },
      { label: 'Saved vehicles', value: '2', detail: 'Ready for your next trip', icon: CarFront, color: 'amber' },
      { label: 'Saved spots', value: '4', detail: 'Your favorite locations', icon: MapPin, color: 'emerald' },
    ],
    actions: [
      { label: 'Find parking', to: '/seeker/search', icon: MapPin, color: 'blue' },
      { label: 'View bookings', to: '/seeker/bookings', icon: CalendarDays, color: 'violet' },
      { label: 'Manage vehicles', to: '/seeker/vehicles', icon: CarFront, color: 'amber' },
    ],
    primaryTitle: 'Upcoming booking',
    primaryContent: (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700"><CircleParking size={21} /></div>
          <div>
            <p className="font-semibold text-slate-900">Downtown Smart Parking</p>
            <p className="mt-1 text-sm text-slate-500">Madhapur, Hyderabad · Car</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700"><CheckCircle2 size={14} /> Booking confirmed</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 sm:text-right">
          <p className="text-sm font-semibold text-slate-900">Today, 4:00 PM – 7:00 PM</p>
          <p className="mt-1 text-xs text-slate-500">Booking ID · PE-24819</p>
        </div>
      </div>
    ),
    secondaryTitle: 'Suggested for you',
    secondaryContent: [
      { name: 'ParkVista Residency', location: 'Gachibowli', price: '₹60', rating: '4.8' },
      { name: 'Tech Park City Lot', location: 'HITEC City', price: '₹35', rating: '4.6' },
    ],
  },
  PROVIDER: {
    stats: [
      { label: 'Active listings', value: '4', detail: '3 published · 1 in review', icon: CircleParking, color: 'blue' },
      { label: 'Bookings this month', value: '38', detail: '+12% from last month', icon: CalendarDays, color: 'violet', trend: 'up' },
      { label: 'Earnings this month', value: '₹28,450', detail: 'Across all your spaces', icon: CreditCard, color: 'emerald', trend: 'up' },
      { label: 'Average rating', value: '4.8', detail: 'From 126 reviews', icon: BadgeCheck, color: 'amber' },
    ],
    actions: [
      { label: 'Manage listings', to: '/provider/listings', icon: CircleParking, color: 'blue' },
      { label: 'Review bookings', to: '/provider/bookings', icon: CalendarDays, color: 'violet' },
      { label: 'Check earnings', to: '/provider/payouts', icon: CreditCard, color: 'emerald' },
    ],
    primaryTitle: 'Recent bookings',
    primaryContent: (
      <div className="divide-y divide-slate-100">
        {[
          ['Ananya Rao', 'Downtown Smart Parking · Today, 3:30 PM', 'Confirmed', '₹180'],
          ['Kiran Das', 'ParkVista Residency · Today, 2:00 PM', 'In progress', '₹260'],
          ['Sana Iqbal', 'Tech Park City Lot · Yesterday, 6:00 PM', 'Completed', '₹140'],
        ].map(([name, detail, status, amount]) => (
          <div key={name} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <div><p className="text-sm font-semibold text-slate-800">{name}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>
            <div className="text-right"><p className="text-sm font-semibold text-slate-900">{amount}</p><p className="mt-1 text-xs text-emerald-700">{status}</p></div>
          </div>
        ))}
      </div>
    ),
    secondaryTitle: 'Listing performance',
    secondaryContent: [
      { name: 'Downtown Smart Parking', location: 'Madhapur', price: '82%', rating: 'Occupancy' },
      { name: 'ParkVista Residency', location: 'Gachibowli', price: '67%', rating: 'Occupancy' },
    ],
  },
  ADMIN: {
    stats: [
      { label: 'Registered users', value: '1,284', detail: 'Across all account types', icon: Users, color: 'blue', trend: 'up' },
      { label: 'Active listings', value: '346', detail: 'Available in the marketplace', icon: CircleParking, color: 'violet' },
      { label: 'Bookings this month', value: '2,891', detail: '+8.4% from last month', icon: CalendarDays, color: 'emerald', trend: 'up' },
      { label: 'Pending reviews', value: '12', detail: 'Listings awaiting approval', icon: ShieldCheck, color: 'amber' },
    ],
    actions: [
      { label: 'Review users', to: '/admin/users', icon: Users, color: 'blue' },
      { label: 'Review listings', to: '/admin/listings', icon: CircleParking, color: 'violet' },
      { label: 'View payments', to: '/admin/payments', icon: CreditCard, color: 'emerald' },
    ],
    primaryTitle: 'Needs your attention',
    primaryContent: (
      <div className="space-y-3">
        {[
          ['Listings pending approval', '12 listings are waiting for review.', 'Review listings', '/admin/listings'],
          ['Provider verification', '5 provider accounts need verification.', 'Review users', '/admin/users'],
          ['Payment exceptions', '2 transactions need a closer look.', 'View payments', '/admin/payments'],
        ].map(([title, detail, action, to]) => (
          <div key={title} className="flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-sm font-semibold text-slate-800">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>
            <Link to={to} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800">{action}<ArrowRight size={14} /></Link>
          </div>
        ))}
      </div>
    ),
    secondaryTitle: 'Marketplace health',
    secondaryContent: [
      { name: 'API availability', location: 'All services responding', price: 'Operational', rating: 'Healthy' },
      { name: 'New user reports', location: 'Last 7 days', price: '3', rating: 'Review' },
    ],
  },
};

const colorClasses = {
  blue: 'bg-blue-50 text-blue-700',
  violet: 'bg-violet-50 text-violet-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
};

function StatCard({ stat }) {
  const Icon = stat.icon;
  const TrendIcon = stat.trend === 'down' ? ArrowDownRight : ArrowUpRight;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-xl p-2.5 ${colorClasses[stat.color]}`}><Icon size={19} /></span>
        {stat.trend && <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-700"><TrendIcon size={15} />{stat.trend === 'up' ? 'Up' : 'Down'}</span>}
      </div>
      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{stat.label}</p>
      <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
    </article>
  );
}

function InfoPanel({ title, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      <h2 className="mb-5 text-base font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function DashboardOverview({ role }) {
  const details = roleDetails[role];
  const preview = previews[role];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">Dashboard overview</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{details.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">{details.subtitle}</p>
        </div>
        <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">Preview data</span>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {preview.stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>

      <InfoPanel title="Quick actions">
        <div className="grid gap-3 sm:grid-cols-3">
          {preview.actions.map(({ label, to, icon: Icon, color }) => (
            <Link key={label} to={to} className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50">
              <span className="flex items-center gap-3 text-sm font-semibold text-slate-700 group-hover:text-blue-800">
                <span className={`rounded-lg p-2 ${colorClasses[color]}`}><Icon size={17} /></span>{label}
              </span>
              <ArrowRight size={16} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700" />
            </Link>
          ))}
        </div>
      </InfoPanel>

      <div className="grid gap-5 xl:grid-cols-5">
        <InfoPanel title={preview.primaryTitle} className="xl:col-span-3">
          {preview.primaryContent}
        </InfoPanel>
        <InfoPanel title={preview.secondaryTitle} className="xl:col-span-2">
          <div className="space-y-3">
            {preview.secondaryContent.map(({ name, location, price, rating }) => (
              <div key={name} className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div><p className="text-sm font-semibold text-slate-800">{name}</p><p className="mt-1 text-xs text-slate-500">{location}</p></div>
                  <span className="whitespace-nowrap rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-700 shadow-sm">{price}</span>
                </div>
                <p className="mt-3 text-xs text-slate-500">{rating}</p>
              </div>
            ))}
          </div>
        </InfoPanel>
      </div>

      <p className="text-xs text-slate-400">Dashboard examples are for preview only. Live account data will appear when the backend is connected.</p>
    </div>
  );
}

function DashboardSection({ role }) {
  const { section } = useParams();
  if (role === 'SEEKER' && section === 'search') return <ParkingSearchPage />;
  if (role === 'SEEKER' && section === 'bookings') return <SeekerBookingsPage />;
  if (role === 'PROVIDER' && section === 'listings') return <ProviderListingsPage />;
  if (role === 'PROVIDER' && section === 'bookings') return <ProviderRequestsPage />;
  if (section === 'settings' || (role === 'PROVIDER' && section === 'profile')) {
    return <AccountSettings />;
  }

  const details = roleDetails[role];
  const sectionDetails = details.sections[section];

  if (!sectionDetails) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">That dashboard section is not available.</p>
        <Link to={`/${role.toLowerCase()}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">Back to overview<ArrowRight size={15} /></Link>
      </div>
    );
  }

  const [title, description] = sectionDetails;
  const Icon = role === 'SEEKER'
    ? { bookings: CalendarDays, vehicles: CarFront, payments: CreditCard, notifications: CheckCircle2 }[section]
    : role === 'PROVIDER'
      ? { listings: CircleParking, bookings: CalendarDays, payouts: CreditCard, profile: Users }[section]
      : { users: Users, listings: CircleParking, payments: CreditCard, settings: ShieldCheck }[section];

  return (
    <div className="mx-auto max-w-3xl py-6">
      <Link to={`/${role.toLowerCase()}`} className="text-sm font-medium text-blue-700 hover:text-blue-800">← Dashboard overview</Link>
      <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><Icon size={25} /></span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">{description}</p>
        <div className="mx-auto mt-7 max-w-lg rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-left">
          <p className="text-sm font-semibold text-blue-900">Ready for backend integration</p>
          <p className="mt-1 text-xs leading-5 text-blue-800">This section is set up in the frontend. Its records and actions will be connected when the API is available.</p>
        </div>
        <Link to={`/${role.toLowerCase()}`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Return to dashboard<ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

export function SeekerDashboard() {
  return <DashboardOverview role="SEEKER" />;
}

export function ProviderDashboard() {
  return <DashboardOverview role="PROVIDER" />;
}

export function AdminDashboard() {
  return <DashboardOverview role="ADMIN" />;
}

export function SeekerSection() {
  return <DashboardSection role="SEEKER" />;
}

export function ProviderSection() {
  return <DashboardSection role="PROVIDER" />;
}

export function AdminSection() {
  return <DashboardSection role="ADMIN" />;
}
