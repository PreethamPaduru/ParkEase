import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const featuredListings = [
  { id: 'L-101', title: 'Downtown Smart Parking', location: 'Madhapur', price: 45, rating: 4.7 },
  { id: 'L-102', title: 'ParkVista Residency', location: 'Gachibowli', price: 60, rating: 4.8 },
  { id: 'L-104', title: 'Banjara Premium Space', location: 'Banjara Hills', price: 80, rating: 4.9 },
];

const steps = [
  { title: 'Search', description: 'Filter by location, time, and vehicle type.' },
  { title: 'Book securely', description: 'Review price, confirm availability, and pay.' },
  { title: 'Park with ease', description: 'Navigate to your spot and check in with QR.' },
];

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('Madhapur, Hyderabad');
  const [date, setDate] = useState('');
  const [vehicle, setVehicle] = useState('Car');

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams({ location: location.trim(), vehicle });
    if (date) params.set('date', date);

    const role = localStorage.getItem('Role');
    if (localStorage.getItem('Token') && role === 'SEEKER') {
      navigate(`/seeker/search?${params.toString()}`);
      return;
    }

    navigate('/login', {
      state: {
        returnTo: `/seeker/search?${params.toString()}`,
      },
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-sky-500 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">Trusted parking marketplace</p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">Find the right parking spot in minutes.</h1>
            <p className="mt-5 max-w-xl text-base text-blue-50 md:text-lg">ParkEase connects drivers with verified parking spaces and helps hosts monetize unused spaces with zero friction.</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link to="/seeker/search" className="rounded-full bg-white px-5 py-3 text-center border-white/40  bg-white/5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-slate-100">Search parking</Link>
              <Link to="/register" className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">List your space</Link>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-left">
              <div className="rounded-2xl bg-white/8 p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">12k+</p>
                <p className="text-xs text-blue-100">bookings</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">4.8/5</p>
                <p className="text-xs text-blue-100">rating</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-3 backdrop-blur-sm">
                <p className="text-2xl font-bold">240+</p>
                <p className="text-xs text-blue-100">hosts</p>
              </div>
            </div>
          </div>

          <div id="search" className="rounded-[2rem] border border-white/30 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
            <div className="rounded-[1.5rem] bg-white p-5 text-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Quick search</p>
                  <p className="text-xl font-bold">Hyderabad</p>
                </div>
                <button className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Use my location</button>
              </div>

              <form onSubmit={handleSearch} className="mt-5 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Where</label>
                  <input
                    className="mt-2 w-full bg-transparent text-base font-medium text-slate-900 outline-none"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="Enter a neighborhood or city"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Date</label>
                    <input type="date" min={new Date().toLocaleDateString('en-CA')} value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-slate-900 outline-none" />
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <label className="block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Vehicle</label>
                    <select value={vehicle} onChange={(event) => setVehicle(event.target.value)} className="mt-2 w-full bg-transparent text-base font-medium text-slate-900 outline-none">
                      <option>Car</option>
                      <option>Bike</option>
                      <option>SUV</option>
                      <option>Truck</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">Search spots</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Park with confidence</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-700">0{index + 1}</div>
              <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Featured parking</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Popular spots near you</h2>
            </div>
            <Link to="/seeker/search" className="hidden text-sm font-semibold text-blue-700 md:inline-flex">View all</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="h-44 bg-gradient-to-br from-slate-200 to-slate-100" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{listing.title}</h3>
                      <p className="mt-1 text-sm text-slate-500">{listing.location}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">★ {listing.rating}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">From</p>
                      <p className="text-xl font-bold text-slate-900">₹{listing.price}/hr</p>
                    </div>
                    <Link to={`/listing/${listing.id}`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Book now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">For providers</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Turn idle space into recurring revenue.</h2>
            <p className="mt-4 text-slate-600">List your unused driveway, basement, or lot in minutes. Set pricing, manage availability, and receive payouts with transparent analytics.</p>
            <div className="mt-6">
              <Link to="/register" className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-400">List your space</Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">This month</p>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">+18.2%</span>
                </div>
                <p className="mt-3 text-3xl font-bold text-slate-900">₹42,800</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-blue-600">Occupancy</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">89%</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-amber-600">Avg. rate</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">₹52/hr</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
