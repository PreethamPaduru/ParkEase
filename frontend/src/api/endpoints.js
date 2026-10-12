import api from './axios.js';
import mockApi from './mockApi.js';

const useMock =
  String(import.meta.env.VITE_USE_MOCK || 'true').toLowerCase() === 'true';

const getHandler = (mockFn, axiosFn) => async (...args) => {
  if (useMock) {
    return { data: await mockFn(...args) };
  }

  return axiosFn(...args);
};

// PUBLIC PARKING LISTINGS
export const getPublicListings = getHandler(
  (params) => mockApi.getPublicListings(params),
  (params) => api.get('/parking/listings', { params }),
);

// PROVIDER PARKING LISTINGS
export const getProviderListings = getHandler(
  (email) => mockApi.getProviderListings(email),
  (email) =>
    api.get(`/parking/listings/provider/${encodeURIComponent(email)}`),
);

// CREATE PARKING LISTING
export const createProviderListing = getHandler(
  (payload, provider) => mockApi.createProviderListing(payload, provider),
  (payload) => api.post('/parking/listings', payload),
);

// CREATE BOOKING REQUEST
export const createBookingRequest = getHandler(
  (payload) => mockApi.createBookingRequest(payload),
  (payload) => api.post('/bookings/requests', payload),
);

// PROVIDER BOOKING REQUESTS
export const getProviderBookingRequests = getHandler(
  (email) => mockApi.getProviderBookingRequests(email),
  () => api.get('/provider/bookings/requests'),
);

// SEEKER BOOKING REQUESTS
export const getSeekerBookingRequests = getHandler(
  (email) => mockApi.getSeekerBookingRequests(email),
  () => api.get('/seeker/bookings/requests'),
);

// ACCEPT OR DECLINE BOOKING REQUEST
export const respondToBookingRequest = getHandler(
  (requestId, status, email) =>
    mockApi.respondToBookingRequest(requestId, status, email),
  (requestId, status) =>
    api.patch(`/provider/bookings/requests/${requestId}`, { status }),
);

// GET LISTING BY ID
export const getListingById = getHandler(
  (id) => mockApi.getListingById(id),
  (id) => api.get(`/public/listings/${id}`),
);

// GET LISTING AVAILABILITY
export const getListingAvailability = getHandler(
  (id, params) => mockApi.getListingAvailability(id, params),
  (id, params) => api.get(`/public/listings/${id}/availability`, { params }),
);

// GET LISTING REVIEWS
export const getListingReviews = getHandler(
  (id) => mockApi.getListingReviews(id),
  (id) => api.get(`/public/listings/${id}/reviews`),
);

// UPDATE ACCOUNT
export const updateAccount = async (id, payload) => {
  if (useMock) {
    return {
      data: await mockApi.updateAccount(payload),
    };
  }

  return api.put(`/parking/update/${id}`, payload);
};

// DELETE ACCOUNT
export const deleteAccount = async (id) => {
  if (useMock) {
    return {
      data: await mockApi.deleteAccount(),
    };
  }

  return api.delete(`/parking/delete/${id}`);
};

// EXPORT ALL FUNCTIONS
export default {
  getPublicListings,
  getProviderListings,
  createProviderListing,
  createBookingRequest,
  getProviderBookingRequests,
  getSeekerBookingRequests,
  respondToBookingRequest,
  getListingById,
  getListingAvailability,
  getListingReviews,
  updateAccount,
  deleteAccount,
};
