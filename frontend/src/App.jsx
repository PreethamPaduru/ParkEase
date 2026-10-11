import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const Login = lazy(() => import('./pages/public/Login.jsx'));
const Register = lazy(() => import('./pages/public/Register.jsx'));
const Home = lazy(() => import('./pages/public/Home.jsx'));
const NotFound = lazy(() => import('./pages/public/NotFound.jsx'));

const dashboardRoutes = (
  <>
    <Route path="/seeker" element={<ProtectedRoute roles={['SEEKER']}><DashboardLayout role="SEEKER" /></ProtectedRoute>}>
      <Route index element={<div className="p-8 text-slate-500">Seeker dashboard coming soon</div>} />
    </Route>
    <Route path="/provider" element={<ProtectedRoute roles={['PROVIDER']}><DashboardLayout role="PROVIDER" /></ProtectedRoute>}>
      <Route index element={<div className="p-8 text-slate-500">Provider dashboard coming soon</div>} />
    </Route>
    <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><DashboardLayout role="ADMIN" /></ProtectedRoute>}>
      <Route index element={<div className="p-8 text-slate-500">Admin dashboard coming soon</div>} />
    </Route>
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-500">Loading ParkEase...</div>}>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<div className="p-8 text-center text-slate-500">Forgot password page coming soon</div>} />
              <Route path="/reset-password" element={<div className="p-8 text-center text-slate-500">Reset password page coming soon</div>} />
              <Route path="/about" element={<div className="p-8 text-center text-slate-500">About page coming soon</div>} />
              <Route path="/contact" element={<div className="p-8 text-center text-slate-500">Contact page coming soon</div>} />
              <Route path="/faq" element={<div className="p-8 text-center text-slate-500">FAQ page coming soon</div>} />
              <Route path="*" element={<NotFound />} />
            </Route>
            {dashboardRoutes}
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </AuthProvider>
  );
}

export default App