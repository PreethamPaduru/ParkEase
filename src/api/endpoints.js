import api from './axios.js';
import mockApi from './mockApi.js';

const useMock = String(import.meta.env.VITE_USE_MOCK || 'true').toLowerCase() === 'true';

const getHandler = (mockFn, axiosFn) => async (...args) => {
  if (useMock) {
    return { data: await mockFn(...args) };
  }

  return axiosFn(...args);
};

export const registerUser = getHandler(
  (payload) => mockApi.registerUser(payload),
  (payload) => api.post('/auth/register', payload),
);

export const loginUser = getHandler(
  (payload) => mockApi.loginUser(payload),
  (payload) => api.post('/auth/login', payload),
);

export const verifyOtp = getHandler(
  (payload) => mockApi.verifyOtp(payload),
  (payload) => api.post('/auth/verify-otp', payload),
);

export const forgotPassword = getHandler(
  (payload) => mockApi.forgotPassword(payload),
  (payload) => api.post('/auth/forgot-password', payload),
);

export const resetPassword = getHandler(
  (payload) => mockApi.resetPassword(payload),
  (payload) => api.post('/auth/reset-password', payload),
);

export const getCurrentUser = getHandler(
  () => mockApi.getCurrentUser(),
  () => api.get('/auth/me'),
);

export const getPublicListings = getHandler(
  (params) => mockApi.getPublicListings(params),
  (params) => api.get('/public/listings', { params }),
);

export const getListingById = getHandler(
  (id) => mockApi.getListingById(id),
  (id) => api.get(`/public/listings/${id}`),
);

export const getListingAvailability = getHandler(
  (id, params) => mockApi.getListingAvailability(id, params),
  (id, params) => api.get(`/public/listings/${id}/availability`, { params }),
);

export const getListingReviews = getHandler(
  (id) => mockApi.getListingReviews(id),
  (id) => api.get(`/public/listings/${id}/reviews`),
);

export const authRoutes = {
  registerUser,
  loginUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
  getCurrentUser,
};

export default {
  registerUser,
  loginUser,
  verifyOtp,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  getPublicListings,
  getListingById,
  getListingAvailability,
  getListingReviews,
};
