import { NavLink, Outlet } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const [open, setOpen] = useState(false);

  return (
      <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">P</span>
            ParkEase
          </NavLink>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</NavLink>
            <NavLink to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</NavLink>
            <NavLink to="/contact" className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</NavLink>
            <NavLink to="/faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</NavLink>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <NavLink to="/login" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700">
              <LogIn size={16} />
              Login
            </NavLink>
            <NavLink to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500">Register</NavLink>
          </div>  
              <button className="inline-flex rounded-full border border-slate-200 p-2 md:hidden" onClick={() => setOpen((value)=>!value)} aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
              </button>
        </div>
        {/* <div className="min-h-screen bg-slate-50 text-slate-800"></div> */}
          
  
          
        

        {open && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
              <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
              <NavLink to="/faq" onClick={() => setOpen(false)}>FAQ</NavLink>
              <NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
