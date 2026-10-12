
import { Suspense, lazy } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public pages
const Login = lazy(() => import('./pages/public/Login.jsx'));
const Register = lazy(() => import('./pages/public/Register.jsx'));
const ForgotPassword = lazy(() => import('./pages/public/ForgotPassword.jsx'));
const Home = lazy(() => import('./pages/public/Home.jsx'));
const NotFound = lazy(() => import('./pages/public/NotFound.jsx'));
const AboutPage = lazy(() => import('./pages/public/InfoPages.jsx').then((module) => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/public/InfoPages.jsx').then((module) => ({ default: module.ContactPage })));
const FAQPage = lazy(() => import('./pages/public/InfoPages.jsx').then((module) => ({ default: module.FAQPage })));

// Dashboard pages
const SeekerDashboard = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.SeekerDashboard,
  }))
);

const ProviderDashboard = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.ProviderDashboard,
  }))
);

const AdminDashboard = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.AdminDashboard,
  }))
);

// Dashboard sections
const SeekerSection = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.SeekerSection,
  }))
);

const ProviderSection = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.ProviderSection,
  }))
);

const AdminSection = lazy(() =>
  import('./pages/dashboard/DashboardPages.jsx').then((module) => ({
    default: module.AdminSection,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center text-slate-500">
            Loading ParkEase...
          </div>
        }
      >
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ForgotPassword />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Route>

          {/* ================= SEEKER ROUTES ================= */}

          <Route
            path="/seeker"
            element={
              <ProtectedRoute allowedRole="SEEKER">
                <DashboardLayout role="SEEKER" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute allowedRole="SEEKER">
                  <SeekerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path=":section"
              element={
                <ProtectedRoute allowedRole="SEEKER">
                  <SeekerSection />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= PROVIDER ROUTES ================= */}

          <Route
            path="/provider"
            element={
              <ProtectedRoute allowedRole="PROVIDER">
                <DashboardLayout role="PROVIDER" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute allowedRole="PROVIDER">
                  <ProviderDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path=":section"
              element={
                <ProtectedRoute allowedRole="PROVIDER">
                  <ProviderSection />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= ADMIN ROUTES ================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <DashboardLayout role="ADMIN" />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path=":section"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminSection />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ================= NOT FOUND ================= */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
      />
    </BrowserRouter>
  );
}

export default App;
