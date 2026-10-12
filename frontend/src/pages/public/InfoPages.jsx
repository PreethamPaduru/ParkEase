import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CarFront, CircleParking, Clock3, Mail, MapPin, MessageSquareText, ShieldCheck, Users } from 'lucide-react';

const containerClass = 'mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16';
const cardClass = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm';

function PublicPageHeading({ eyebrow, title, description }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </header>
  );
}

export function AboutPage() {
  const values = [
    { icon: MapPin, title: 'Closer to your destination', description: 'Search by neighborhood or city to discover parking offers that fit your trip.' },
    { icon: Users, title: 'A shared marketplace', description: 'Drivers find spaces while parking owners can make their available spaces discoverable.' },
    { icon: ShieldCheck, title: 'Clear booking requests', description: 'Choose an individual offer and send a request directly to its provider. The request stays pending until the provider responds.' },
  ];

  return (
    <div className={containerClass}>
      <PublicPageHeading
        eyebrow="About ParkEase"
        title="Make finding parking feel easier"
        description="ParkEase is a parking marketplace concept connecting people looking for a place to park with providers who have spaces to offer."
      />

      <section className="mt-12 grid gap-8 rounded-3xl bg-gradient-to-br from-blue-700 to-sky-500 p-7 text-white shadow-lg sm:p-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-100">One simple flow</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Search, choose, request.</h2>
          <p className="mt-4 text-sm leading-6 text-blue-50">Enter where you need to park, compare provider offers, and send a booking request for the space that works for you. Providers can respond to requests for their own listings.</p>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50">Explore ParkEase<ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: MapPin, label: 'Search nearby spaces' },
            { icon: CircleParking, label: 'Compare parking offers' },
            { icon: CalendarCheck, label: 'Choose your parking time' },
            { icon: MessageSquareText, label: 'Request from the provider' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <Icon size={19} className="shrink-0 text-blue-100" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Designed for both sides of parking</h2>
          <p className="mt-2 text-sm text-slate-500">A straightforward way for seekers and providers to connect.</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
            <article key={title} className={cardClass}>
              <span className="inline-flex rounded-xl bg-blue-50 p-2.5 text-blue-700"><Icon size={20} /></span>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-400">ParkEase is a project in development. Availability, payment, and account features depend on backend services being configured.</p>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const submitContactForm = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={containerClass}>
      <PublicPageHeading
        eyebrow="Contact"
        title="How can we help?"
        description="Send a question about finding parking, booking requests, or listing a space. This form is a frontend preview and does not send or save messages yet."
      />

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <article className={cardClass}>
            <span className="inline-flex rounded-xl bg-blue-50 p-2.5 text-blue-700"><CarFront size={20} /></span>
            <h2 className="mt-4 font-bold text-slate-900">Looking for parking?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Search by location, select one provider’s offer, and track your request from your seeker dashboard.</p>
            <Link to="/#search" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">Go to search<ArrowRight size={14} /></Link>
          </article>
          <article className={cardClass}>
            <span className="inline-flex rounded-xl bg-emerald-50 p-2.5 text-emerald-700"><CircleParking size={20} /></span>
            <h2 className="mt-4 font-bold text-slate-900">Have a space to offer?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Providers can add a parking offer from their dashboard. Seekers can then find it by location.</p>
            <Link to="/register" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">Create an account<ArrowRight size={14} /></Link>
          </article>
        </aside>

        <form onSubmit={submitContactForm} className={`${cardClass} space-y-4`}>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Send us a message</h2>
            <p className="mt-1 text-xs text-slate-500">Messages are not transmitted until a support service is connected.</p>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Your name</span>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" name="name" autoComplete="name" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Email</span>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" name="email" type="email" autoComplete="email" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">How can we help?</span>
            <textarea className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" name="message" rows="5" minLength="10" required />
          </label>
          <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Review message</button>
          {submitted && <p role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">This preview does not send or store your message. A backend contact endpoint is needed to submit it.</p>}
        </form>
      </div>
    </div>
  );
}

const faqSections = [
  {
    title: 'Finding and requesting parking',
    questions: [
      ['How do I find a parking space?', 'Enter a neighborhood or city in the home page search. After signing in as a seeker, matching parking offers are shown with their location, vehicle types, and hourly price.'],
      ['Does sending a request confirm my booking?', 'No. Sending creates a pending request for the provider of the selected offer. The booking is not confirmed unless the provider accepts it. You can check the request status in your seeker dashboard under Bookings.'],
      ['Can I send a request to multiple providers at once?', 'The current flow sends a request to one provider at a time, for the specific parking offer you choose.'],
      ['What if I cannot find parking in a location?', 'Try a nearby neighborhood or a broader city name. Only published offers matching the search are shown.'],
    ],
  },
  {
    title: 'For parking providers',
    questions: [
      ['How do I list my parking space?', 'Sign in with a provider account, open Listings in your provider dashboard, and add the address, city, price, capacity, vehicle types, and opening hours.'],
      ['Where do booking requests appear?', 'Requests for your offers appear under Bookings in your provider dashboard. You can accept or decline a pending request there.'],
      ['Will seekers see my offer immediately?', 'Published offers become searchable through the marketplace. In production, visibility depends on the backend and any review or approval rules configured there.'],
    ],
  },
  {
    title: 'Accounts, payment, and data',
    questions: [
      ['Is a payment taken when I send a request?', 'The current frontend request flow does not take payment. Payment processing must be implemented and confirmed by the backend before a payment can be made.'],
      ['Where are requests stored?', 'In mock mode, test requests are stored in browser local storage. With mock mode disabled, the frontend sends the request to the backend; the backend must implement database persistence for it to be saved centrally.'],
      ['How do I sign out?', 'Use the Logout button in your dashboard. It clears the frontend login details from this browser and returns you to the login page.'],
    ],
  },
];

export function FAQPage() {
  return (
    <div className={containerClass}>
      <PublicPageHeading
        eyebrow="Frequently asked questions"
        title="Answers before you park"
        description="Learn how parking search, booking requests, provider listings, and the current project preview work."
      />
      <div className="mx-auto mt-10 max-w-4xl space-y-8">
        {faqSections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-lg font-bold text-slate-900">{section.title}</h2>
            <div className="space-y-3">
              {section.questions.map(([question, answer]) => (
                <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-slate-800">
                    {question}
                    <span className="text-xl leading-none text-blue-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl bg-blue-50 p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-white p-2 text-blue-700"><Mail size={18} /></span>
          <div><p className="text-sm font-bold text-slate-900">Still have a question?</p><p className="mt-1 text-xs text-slate-600">Use the contact page to describe what you need help with.</p></div>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Contact us<ArrowRight size={15} /></Link>
      </div>
      <p className="mx-auto mt-6 flex max-w-4xl items-center gap-2 text-xs text-slate-400"><Clock3 size={14} />Some features described here require the ParkEase backend to be connected.</p>
    </div>
  );
}
