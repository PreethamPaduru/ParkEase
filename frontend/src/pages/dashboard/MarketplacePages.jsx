import { useEffect, useRef, useState } from 'react';
import { Building2, CalendarClock, CarFront, Check, Clock3, MapPin, Plus, Search, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  createBookingRequest,
  createProviderListing,
  getProviderBookingRequests,
  getProviderListings,
  getPublicListings,
  getSeekerBookingRequests,
  respondToBookingRequest,
} from '../../api/endpoints.js';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100';
const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-700';

const readAccount = () => JSON.parse(localStorage.getItem('parkease_user') || 'null');
const formatLocation = (address = '', city = '') => {
  const addressLine = String(address).trim();
  const cityName = String(city).trim();
  return !cityName || addressLine.toLowerCase().endsWith(cityName.toLowerCase())
    ? addressLine
    : `${addressLine}, ${cityName}`;
};
const toLocalDateTime = (date) => {
  const localDate = new Date(date);
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().slice(0, 16);
};

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </header>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
      <Building2 className="mx-auto text-slate-400" size={28} />
      <h2 className="mt-3 text-sm font-semibold text-slate-800">{title}</h2>
      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p>{message}</p>
      {onRetry && <button type="button" onClick={onRetry} className="mt-2 font-semibold underline">Try again</button>}
    </div>
  );
}

export function ParkingSearchPage() {
  const account = readAccount();
  const [searchParams] = useSearchParams();
  const searchFormRef = useRef(null);
  const initialLocation = searchParams.get('location') || '';
  const [location, setLocation] = useState(initialLocation);
  const [listings, setListings] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [vehicleType, setVehicleType] = useState(searchParams.get('vehicle') || '');
  const requestedDate = searchParams.get('date');
  const [startAt, setStartAt] = useState(requestedDate ? `${requestedDate}T12:00` : '');
  const [hours, setHours] = useState('2');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!initialLocation) return undefined;
    const timeoutId = window.setTimeout(() => searchFormRef.current?.requestSubmit(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [initialLocation]);

  const search = async (event) => {
    event?.preventDefault();
    setLoading(true);
    setError('');
    setHasSearched(true);
    setSelectedListing(null);
    try {
      const response = await getPublicListings({ location, page: 1, size: 100 });
      const allResults = response.data.content || response.data;
      const requestedVehicle = searchParams.get('vehicle');
      const results = requestedVehicle
        ? allResults.filter((listing) => listing.vehicleTypes?.some(
          (vehicle) => vehicle.toLowerCase() === requestedVehicle.toLowerCase(),
        ))
        : allResults;
      setListings(results);
    } catch (requestError) {
      setListings([]);
      setError(requestError.response?.data?.message || requestError.message || 'Could not load parking offers.');
    } finally {
      setLoading(false);
    }
  };

  const chooseOffer = (listing) => {
    setSelectedListing(listing);
    const requestedVehicle = searchParams.get('vehicle');
    const matchingVehicle = listing.vehicleTypes?.find(
      (vehicle) => vehicle.toLowerCase() === requestedVehicle?.toLowerCase(),
    );
    setVehicleType(matchingVehicle || listing.vehicleTypes?.[0] || 'Car');
  };

  const sendRequest = async (event) => {
    event.preventDefault();
    if (!account?.email) {
      toast.error('Your account email is unavailable. Please sign in again.');
      return;
    }
    setSending(true);
    try {
      await createBookingRequest({
        listingId: selectedListing.id,
        seekerName: account.name || account.email.split('@')[0],
        seekerEmail: account.email,
        vehicleType,
        startAt,
        hours,
      });
      toast.success('Request sent to the parking provider.');
      setSelectedListing(null);
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || requestError.message || 'Could not send your request.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeading
        eyebrow="Parking marketplace"
        title="Find parking near you"
        description="Enter a location to see available provider offers. Choose one space to send a booking request directly to that provider."
      />

      <form ref={searchFormRef} onSubmit={search} className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Location</span>
          <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={`${inputClass} pl-10`}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Try Madhapur, Hyderabad"
            aria-label="Search location"
          />
        </label>
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60">
          <Search size={16} />{loading ? 'Searching…' : 'Search parking'}
        </button>
      </form>

      {error && <ErrorState message={error} onRetry={() => search()} />}

      {loading && <p className="py-10 text-center text-sm text-slate-500">Finding parking offers…</p>}

      {!loading && hasSearched && !error && listings.length === 0 && (
        <EmptyState title="No parking found for this location" description="Try another neighborhood or city. Providers need to publish an offer before it can appear here." />
      )}

      {!loading && listings.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs font-medium text-slate-500">{listings.length} parking {listings.length === 1 ? 'offer' : 'offers'} {location.trim() && <>near <span className="font-semibold text-slate-700">{location}</span></>}</p>
          <div className="grid gap-4 xl:grid-cols-2">
            {listings.map((listing) => (
              <article key={listing.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-blue-50 p-2 text-blue-700"><Building2 size={17} /></span>
                      <h2 className="font-bold text-slate-900">{listing.title}</h2>
                    </div>
                    <p className="mt-3 flex items-start gap-1.5 text-sm text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-slate-400" />{formatLocation(listing.address, listing.city)}</p>
                    <p className="mt-2 text-xs text-slate-500">{listing.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(listing.vehicleTypes || []).map((vehicle) => <span key={vehicle} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{vehicle}</span>)}
                      {listing.covered && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">Covered</span>}
                    </div>
                    <p className="mt-4 text-xs text-slate-500">Offered by <span className="font-semibold text-slate-700">{listing.provider?.name || 'Parking provider'}</span></p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="text-xl font-bold text-slate-900">₹{listing.pricePerHour}<span className="text-xs font-medium text-slate-500"> / hour</span></p>
                    <p className="mt-1 text-xs text-slate-500">{listing.totalSlots} spaces</p>
                    <button type="button" onClick={() => chooseOffer(listing)} className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700">
                      Request this space
                    </button>
                  </div>
                </div>
                {selectedListing?.id === listing.id && (
                  <form onSubmit={sendRequest} className="grid gap-3 border-t border-slate-100 bg-blue-50/50 p-5 sm:grid-cols-2">
                    <label>
                      <span className={labelClass}>Vehicle</span>
                      <select className={inputClass} value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} required>
                        {(listing.vehicleTypes || ['Car']).map((vehicle) => <option key={vehicle}>{vehicle}</option>)}
                      </select>
                    </label>
                    <label>
                      <span className={labelClass}>Start date and time</span>
                      <input className={inputClass} type="datetime-local" value={startAt} onChange={(event) => setStartAt(event.target.value)} required min={toLocalDateTime(new Date())} />
                    </label>
                    <label>
                      <span className={labelClass}>Parking duration</span>
                      <select className={inputClass} value={hours} onChange={(event) => setHours(event.target.value)}>
                        {[1, 2, 3, 4, 6, 8, 12, 24].map((hour) => <option key={hour} value={hour}>{hour} {hour === 1 ? 'hour' : 'hours'}</option>)}
                      </select>
                    </label>
                    <div className="flex items-end gap-2">
                      <button type="submit" disabled={sending} className="flex-1 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{sending ? 'Sending…' : 'Send booking request'}</button>
                      <button type="button" onClick={() => setSelectedListing(null)} aria-label="Cancel request" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:text-slate-900"><X size={16} /></button>
                    </div>
                  </form>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProviderListingsPage() {
  const account = readAccount();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    const loadListings = async () => {
      try {
        if (!account?.email) throw new Error('Your account email is unavailable. Please sign in again.');
        const response = await getProviderListings(account.email);
        if (active) {
          setError('');
          setListings(response.data);
        }
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Could not load your listings.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadListings();
    return () => { active = false; };
  }, [account?.email, refreshKey]);

  const submitListing = async (event) => {
    event.preventDefault();
    if (!account?.email) {
      toast.error('Your account email is unavailable. Please sign in again.');
      return;
    }
    const formData = new FormData(event.currentTarget);
    const vehicleTypes = formData.getAll('vehicleTypes');
    if (vehicleTypes.length === 0) {
      toast.error('Choose at least one vehicle type.');
      return;
    }

setSaving(true);

try {
  await createProviderListing({
    offerName: formData.get('title'),
    description: formData.get('description'),
    street: formData.get('address'),
    city: formData.get('city'),

    availableSpaces: Number(formData.get('totalSlots')),
    pricePerHour: Number(formData.get('pricePerHour')),

    supportedVehicles: vehicleTypes,

    covered: formData.get('covered') === 'on',
    evCharging: formData.get('evCharging') === 'on',
    cctv: formData.get('cctv') === 'on',
    open24x7: formData.get('is24x7') === 'on',

    opens: formData.get('openTime')
      ? formData.get('openTime') + ':00'
      : null,

    closes: formData.get('closeTime')
      ? formData.get('closeTime') + ':00'
      : null,

    providerEmail: account.email,
  });

  toast.success('Parking offer submitted successfully.');
  setShowForm(false);
  setLoading(true);
  setRefreshKey((value) => value + 1);

} catch (requestError) {
  toast.error(
    requestError.response?.data?.message ||
    requestError.message ||
    'Could not publish this offer.'
  );
} finally {
  setSaving(false);
}
};

  return (
    <div>
      <PageHeading
        eyebrow="Provider workspace"
        title="Your parking offers"
        description="Publish your available parking spaces so seekers can find them and send you booking requests."
        action={<button type="button" onClick={() => setShowForm((value) => !value)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Plus size={17} />Add parking offer</button>}
      />

      {showForm && (
        <form onSubmit={submitListing} className="mb-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-bold text-slate-900">Parking space details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className={labelClass}>Offer name</span><input name="title" className={inputClass} placeholder="e.g. Covered parking near Central Park" required maxLength={90} /></label>
            <label className="sm:col-span-2"><span className={labelClass}>Description</span><textarea name="description" className={inputClass} rows="2" placeholder="Describe access, security, or other useful details" required maxLength={400} /></label>
            <label><span className={labelClass}>Street / neighborhood</span><input name="address" className={inputClass} required /></label>
            <label><span className={labelClass}>City</span><input name="city" className={inputClass} required /></label>
            <label><span className={labelClass}>Available spaces</span><input name="totalSlots" type="number" min="1" max="500" className={inputClass} required /></label>
            <label><span className={labelClass}>Price per hour (₹)</span><input name="pricePerHour" type="number" min="1" step="1" className={inputClass} required /></label>
            <fieldset className="sm:col-span-2">
              <legend className={labelClass}>Supported vehicles</legend>
              <div className="flex flex-wrap gap-4 text-sm text-slate-700">
                {['Car', 'Bike', 'SUV', 'Truck'].map((vehicle) => <label key={vehicle} className="inline-flex items-center gap-2"><input type="checkbox" name="vehicleTypes" value={vehicle} className="accent-blue-600" />{vehicle}</label>)}
              </div>
            </fieldset>
            <label><span className={labelClass}>Opens</span><input name="openTime" type="time" defaultValue="08:00" className={inputClass} required /></label>
            <label><span className={labelClass}>Closes</span><input name="closeTime" type="time" defaultValue="20:00" className={inputClass} required /></label>
            <fieldset className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700 sm:col-span-2">
              {['covered', 'evCharging', 'cctv', 'is24x7'].map((name) => <label key={name} className="inline-flex items-center gap-2"><input type="checkbox" name={name} className="accent-blue-600" />{({ covered: 'Covered', evCharging: 'EV charging', cctv: 'CCTV', is24x7: 'Open 24/7' })[name]}</label>)}
            </fieldset>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{saving ? 'Publishing…' : 'Publish offer'}</button>
          </div>
        </form>
      )}

      {error && <ErrorState message={error} onRetry={() => { setLoading(true); setRefreshKey((value) => value + 1); }} />}
      {loading && <p className="py-10 text-center text-sm text-slate-500">Loading your parking offers…</p>}
      {!loading && !error && listings.length === 0 && <EmptyState title="No offers published yet" description="Add your parking space to make it searchable by location. Booking requests will appear in your Bookings inbox." />}
      {!loading && listings.length > 0 && (
        <div className="grid gap-4 xl:grid-cols-2">
          {listings.map((listing) => (
            <article key={listing.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="font-bold text-slate-900">{listing.title}</h2><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13} />{formatLocation(listing.address, listing.city)}</p></div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">{listing.status}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{listing.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{listing.totalSlots} spaces</span><span>·</span><span>₹{listing.pricePerHour}/hour</span><span>·</span><span>{(listing.vehicleTypes || []).join(', ')}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
};

const statusStyles = {
  PENDING: 'bg-amber-50 text-amber-800',
  ACCEPTED: 'bg-emerald-50 text-emerald-800',
  DECLINED: 'bg-red-50 text-red-800',
};

export function ProviderRequestsPage() {
  const account = readAccount();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    const loadRequests = async () => {
      try {
        if (!account?.email) throw new Error('Your account email is unavailable. Please sign in again.');
        const response = await getProviderBookingRequests(account.email);
        if (active) {
          setError('');
          setRequests(response.data);
        }
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Could not load booking requests.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadRequests();
    return () => { active = false; };
  }, [account?.email, refreshKey]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRefreshKey((value) => value + 1);
    }, 15000);
    return () => window.clearInterval(intervalId);
  }, []);

  const answerRequest = async (request, status) => {
    if (!account?.email) {
      toast.error('Your account email is unavailable. Please sign in again.');
      return;
    }
    setUpdatingId(request.id);
    try {
      await respondToBookingRequest(request.id, status, account.email);
      toast.success(status === 'ACCEPTED' ? 'Booking request accepted.' : 'Booking request declined.');
      setLoading(true);
      setRefreshKey((value) => value + 1);
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || requestError.message || 'Could not update this request.');
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <div>
      <PageHeading
        eyebrow="Provider workspace"
        title="Booking requests"
        description="Requests from seekers for your parking offers appear here. Accept or decline each request."
        action={<button type="button" onClick={() => { setLoading(true); setRefreshKey((value) => value + 1); }} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Refresh requests</button>}
      />
      {error && <ErrorState message={error} onRetry={() => { setLoading(true); setRefreshKey((value) => value + 1); }} />}
      {loading && <p className="py-10 text-center text-sm text-slate-500">Loading booking requests…</p>}
      {!loading && !error && requests.length === 0 && <EmptyState title="No booking requests yet" description="When a seeker chooses one of your parking offers and sends a request, it will show up here." />}
      {!loading && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="flex items-center gap-2"><h2 className="font-bold text-slate-900">{request.listingTitle}</h2><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[request.status] || 'bg-slate-100 text-slate-700'}`}>{request.status}</span></div>                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13} />{formatLocation(request.address, request.city)}</p></div>
                <p className="text-xs text-slate-400">Request {request.id}</p>
              </div>
              <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
                <div><p className="text-slate-400">Seeker</p><p className="mt-1 font-semibold text-slate-800">{request.seekerName}</p><p className="mt-0.5 text-slate-500">{request.seekerEmail}</p></div>
                <div><p className="text-slate-400">Requested start</p><p className="mt-1 font-semibold text-slate-800">{formatDate(request.startAt)}</p></div>
                <div><p className="text-slate-400">Duration and vehicle</p><p className="mt-1 font-semibold text-slate-800">{request.hours} hours · {request.vehicleType}</p></div>
                <div><p className="text-slate-400">Estimated price</p><p className="mt-1 font-semibold text-slate-800">₹{Number(request.pricePerHour) * Number(request.hours)}</p></div>
              </div>
              {request.status === 'PENDING' && (
                <div className="mt-4 flex justify-end gap-2">
                  <button type="button" disabled={updatingId === request.id} onClick={() => answerRequest(request, 'DECLINED')} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"><X size={14} />Decline</button>
                  <button type="button" disabled={updatingId === request.id} onClick={() => answerRequest(request, 'ACCEPTED')} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"><Check size={14} />{updatingId === request.id ? 'Updating…' : 'Accept request'}</button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function SeekerBookingsPage() {
  const account = readAccount();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    const loadBookings = async () => {
      try {
        if (!account?.email) throw new Error('Your account email is unavailable. Please sign in again.');
        const response = await getSeekerBookingRequests(account.email);
        if (active) {
          setError('');
          setRequests(response.data);
        }
      } catch (requestError) {
        if (active) setError(requestError.response?.data?.message || requestError.message || 'Could not load your requests.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadBookings();
    return () => { active = false; };
  }, [account?.email, refreshKey]);

  return (
    <div>
      <PageHeading
        eyebrow="Seeker workspace"
        title="My booking requests"
        description="Check request status and provider responses for the parking spaces you selected."
        action={<div className="flex gap-2">
          <button type="button" onClick={() => { setLoading(true); setRefreshKey((value) => value + 1); }} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">Refresh</button>
          <Link to="/seeker/search" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"><Search size={16} />Find parking</Link>
        </div>}
      />
      {error && <ErrorState message={error} onRetry={() => { setLoading(true); setRefreshKey((value) => value + 1); }} />}
      {loading && <p className="py-10 text-center text-sm text-slate-500">Loading your requests…</p>}
      {!loading && !error && requests.length === 0 && <EmptyState title="No booking requests yet" description="Search for parking near your destination and send a request to a provider to see it here." />}
      {!loading && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map((request) => (
            <article key={request.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="flex items-center gap-2"><h2 className="font-bold text-slate-900">{request.listingTitle}</h2><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyles[request.status] || 'bg-slate-100 text-slate-700'}`}>{request.status}</span></div>                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><MapPin size={13} />{formatLocation(request.address, request.city)}</p></div>
                <p className="text-xs text-slate-400">Request {request.id}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1.5"><CalendarClock size={14} />{formatDate(request.startAt)}</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{request.hours} hours · {request.vehicleType}</span>
                <span className="inline-flex items-center gap-1.5"><CarFront size={14} />Provider: {request.providerName}</span>
                <span className="font-semibold text-slate-800">Est. ₹{Number(request.pricePerHour) * Number(request.hours)}</span>
              </div>
              <p className="mt-3 text-xs text-slate-500">{request.status === 'PENDING' ? 'Waiting for the selected provider to respond.' : request.status === 'ACCEPTED' ? 'The provider accepted your request.' : 'The provider declined this request.'}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
