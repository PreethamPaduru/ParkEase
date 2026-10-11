const demoUsers = {
  'seeker@demo.com': {
    id: 'u-seeker',
    name: 'Aarav Sharma',
    email: 'seeker@demo.com',
    phone: '+91 98765 43210',
    role: 'SEEKER',
    password: 'seeker@demo.com',
  },
  'provider@demo.com': {
    id: 'u-providerq  ',
    name: 'Megha Reddy',
    email: 'provider@demo.com',
    phone: '+91 91234 56789',
    role: 'PROVIDER',
    password: 'provider@demo.com',
  },
  'admin@demo.com': {
    id: 'u-admin',
    name: 'Rahul Nair',
    email: 'admin@demo.com',
    phone: '+91 99887 76655',
    role: 'ADMIN',
    password: 'admin@demo.com',
  },
};

const sleep = (min = 400, max = 800) =>
  new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, timeout);
  });

const listings = [
  {
    id: 'L-101',
    title: 'Downtown Smart Parking',
    description: 'Covered parking near major offices and retail spaces.',
    address: 'Madhapur, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4401,
    lng: 78.3911,
    photos: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 24,
    vehicleTypes: ['Bike', 'Car', 'SUV'],
    pricePerHour: 45,
    pricePerDay: 220,
    pricePerMonth: 4500,
    covered: true,
    evCharging: true,
    cctv: true,
    is24x7: true,
    securityGuard: false,
    openTime: '06:00',
    closeTime: '23:30',
    rules: ['No overnight parking', 'Covered only for cars and SUVs'],
    rating: 4.7,
    reviewCount: 132,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-102',
    title: 'ParkVista Residency',
    description: 'Secure parking for residents and guests in a gated community.',
    address: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4416,
    lng: 78.3485,
    photos: ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 18,
    vehicleTypes: ['Car', 'SUV', 'Truck'],
    pricePerHour: 60,
    pricePerDay: 260,
    pricePerMonth: 5200,
    covered: true,
    evCharging: false,
    cctv: true,
    is24x7: true,
    securityGuard: true,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['Display QR while entering', 'Checkin before 10 PM'],
    rating: 4.8,
    reviewCount: 196,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-103',
    title: 'Tech Park City Lot',
    description: 'Prime lot near startup offices and co-working spaces.',
    address: 'HITEC City, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4556,
    lng: 78.3762,
    photos: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 32,
    vehicleTypes: ['Bike', 'Car', 'SUV'],
    pricePerHour: 35,
    pricePerDay: 180,
    pricePerMonth: 3900,
    covered: false,
    evCharging: true,
    cctv: true,
    is24x7: false,
    securityGuard: true,
    openTime: '08:00',
    closeTime: '20:00',
    rules: ['Valid vehicle registration required'],
    rating: 4.5,
    reviewCount: 82,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-104',
    title: 'Banjara Premium Space',
    description: 'Well-lit premium parking near Banjara Hills nightlife.',
    address: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4127,
    lng: 78.4347,
    photos: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 20,
    vehicleTypes: ['Car', 'SUV'],
    pricePerHour: 80,
    pricePerDay: 340,
    pricePerMonth: 6500,
    covered: true,
    evCharging: false,
    cctv: true,
    is24x7: true,
    securityGuard: true,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['No long-term storage without approval'],
    rating: 4.9,
    reviewCount: 240,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-105',
    title: 'Airport Transit Bay',
    description: 'Short stay parking with quick in-and-out access.',
    address: 'Rajiv Gandhi Intl Airport Road, Hyderabad',
    city: 'Hyderabad',
    lat: 17.2403,
    lng: 78.4294,
    photos: ['https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 40,
    vehicleTypes: ['Car', 'SUV', 'Truck'],
    pricePerHour: 50,
    pricePerDay: 300,
    pricePerMonth: 6100,
    covered: false,
    evCharging: true,
    cctv: true,
    is24x7: true,
    securityGuard: false,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['Maximum 4 hours for transit bookings'],
    rating: 4.4,
    reviewCount: 74,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-106',
    title: 'Circle Park Hub',
    description: 'Convenient parking near restaurants and cinema halls.',
    address: 'Banjara Circle, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4246,
    lng: 78.4203,
    photos: ['https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 16,
    vehicleTypes: ['Bike', 'Car'],
    pricePerHour: 40,
    pricePerDay: 190,
    pricePerMonth: 4200,
    covered: true,
    evCharging: false,
    cctv: true,
    is24x7: false,
    securityGuard: true,
    openTime: '09:00',
    closeTime: '22:00',
    rules: ['No bike parking after 10 PM'],
    rating: 4.6,
    reviewCount: 112,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-107',
    title: 'Avenue Green Lot',
    description: 'Open lot with high visibility and quick exit lanes.',
    address: 'Kondapur, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4692,
    lng: 78.374,
    photos: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 28,
    vehicleTypes: ['Car', 'SUV', 'Truck'],
    pricePerHour: 52,
    pricePerDay: 230,
    pricePerMonth: 4800,
    covered: false,
    evCharging: true,
    cctv: true,
    is24x7: true,
    securityGuard: false,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['Truck parking requires prior confirmation'],
    rating: 4.3,
    reviewCount: 69,
    status: 'PENDING',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-108',
    title: 'LB Nagar Premium Park',
    description: 'Family-friendly gated parking with CCTV and attendants.',
    address: 'LB Nagar, Hyderabad',
    city: 'Hyderabad',
    lat: 17.3476,
    lng: 78.5512,
    photos: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 22,
    vehicleTypes: ['Bike', 'Car', 'SUV'],
    pricePerHour: 42,
    pricePerDay: 200,
    pricePerMonth: 4300,
    covered: true,
    evCharging: false,
    cctv: true,
    is24x7: true,
    securityGuard: true,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['No vehicle modifications on site'],
    rating: 4.7,
    reviewCount: 158,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-109',
    title: 'University Parking Plaza',
    description: 'Affordable lot for students and nearby commuters.',
    address: 'Gachibowli, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4518,
    lng: 78.3498,
    photos: ['https://images.unsplash.com/photo-1551818255-e6e109875c47?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 26,
    vehicleTypes: ['Bike', 'Car'],
    pricePerHour: 30,
    pricePerDay: 150,
    pricePerMonth: 3200,
    covered: false,
    evCharging: true,
    cctv: true,
    is24x7: false,
    securityGuard: false,
    openTime: '07:00',
    closeTime: '21:00',
    rules: ['No entry after closing'],
    rating: 4.2,
    reviewCount: 90,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-110',
    title: 'Kukatpally Metro Lot',
    description: 'Perfect for commuters using metro and office routes.',
    address: 'Kukatpally, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4848,
    lng: 78.4136,
    photos: ['https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 30,
    vehicleTypes: ['Bike', 'Car', 'SUV'],
    pricePerHour: 38,
    pricePerDay: 170,
    pricePerMonth: 3700,
    covered: false,
    evCharging: false,
    cctv: true,
    is24x7: true,
    securityGuard: true,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['No overnight stays without booking'],
    rating: 4.6,
    reviewCount: 104,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-111',
    title: 'Secunderabad Passenger Lot',
    description: 'High-turnover parking near rail and bus stations.',
    address: 'Secunderabad, Hyderabad',
    city: 'Hyderabad',
    lat: 17.4399,
    lng: 78.4989,
    photos: ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 34,
    vehicleTypes: ['Bike', 'Car', 'SUV'],
    pricePerHour: 46,
    pricePerDay: 210,
    pricePerMonth: 4400,
    covered: true,
    evCharging: false,
    cctv: true,
    is24x7: true,
    securityGuard: false,
    openTime: '00:00',
    closeTime: '23:59',
    rules: ['Use designated entry gate'],
    rating: 4.5,
    reviewCount: 118,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
  {
    id: 'L-112',
    title: 'Old City Heritage Park',
    description: 'Secure parking near markets and heritage attractions.',
    address: 'Charminar, Hyderabad',
    city: 'Hyderabad',
    lat: 17.3616,
    lng: 78.4747,
    photos: ['https://images.unsplash.com/photo-1529074963764-98f545c6a2f7?auto=format&fit=crop&w=1200&q=80'],
    totalSlots: 14,
    vehicleTypes: ['Bike', 'Car'],
    pricePerHour: 28,
    pricePerDay: 120,
    pricePerMonth: 2800,
    covered: false,
    evCharging: false,
    cctv: true,
    is24x7: false,
    securityGuard: true,
    openTime: '08:00',
    closeTime: '22:00',
    rules: ['Avoid peak-hour pedestrian zone'],
    rating: 4.1,
    reviewCount: 55,
    status: 'ACTIVE',
    provider: { id: 'u-provider', name: 'Megha Reddy' },
  },
];

const buildAuthResponse = (user) => ({
  token: `mock-token-${user.id}-${Date.now()}`,
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const mockApi = {
  async registerUser(payload) {
    await sleep();
    const user = { ...payload, id: `u-${Date.now()}`, role: payload.role.toUpperCase() };
    demoUsers[user.email] = user;
    return buildAuthResponse(user);
  },

  async loginUser(payload) {
    await sleep();
    const user = demoUsers[payload.email.toLowerCase()];

    if (!user || user.password !== payload.password) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    return buildAuthResponse(user);
  },

  async verifyOtp(payload) {
    await sleep();
    if (!payload.email || !payload.otp || payload.otp.length < 6) {
      const error = new Error('OTP is invalid');
      error.status = 400;
      throw error;
    }

    return { success: true, message: 'OTP verified successfully' };
  },

  async forgotPassword(payload) {
    await sleep();
    if (!payload.email) {
      const error = new Error('Email is required');
      error.status = 400;
      throw error;
    }

    return { success: true, message: 'Password reset link sent' };
  },

  async resetPassword(payload) {
    await sleep();
    if (!payload.token || !payload.newPassword) {
      const error = new Error('Token and new password are required');
      error.status = 400;
      throw error;
    }

    return { success: true, message: 'Password updated successfully' };
  },

  async getCurrentUser() {
    await sleep();
    const session = JSON.parse(localStorage.getItem('parkease_session') || 'null');
    if (!session || !session.email) {
      const error = new Error('User is not authenticated');
      error.status = 401;
      throw error;
    }

    const user = demoUsers[session.email.toLowerCase()];
    if (!user) {
      const error = new Error('Session not found');
      error.status = 401;
      throw error;
    }

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  },

  async getPublicListings(params = {}) {
    await sleep();
    const activeListings = listings.filter((listing) => listing.status === 'ACTIVE');
    const page = Number(params.page || 1);
    const size = Number(params.size || 8);
    const start = (page - 1) * size;
    const end = start + size;

    return {
      content: activeListings.slice(start, end),
      totalPages: Math.max(1, Math.ceil(activeListings.length / size)),
      totalElements: activeListings.length,
    };
  },

  async getListingById(id) {
    await sleep();
    const listing = listings.find((item) => item.id === id);
    if (!listing) {
      const error = new Error('Listing not found');
      error.status = 404;
      throw error;
    }
    return listing;
  },

  async getListingAvailability() {
    await sleep();
    return {
      available: true,
      slotsLeft: 12,
      date: new Date().toISOString(),
    };
  },

  async getListingReviews() {
    await sleep();
    return [
      { id: 'r1', user: 'Nikita', rating: 5, comment: 'Very safe and easy to access.' },
      { id: 'r2', user: 'Srujan', rating: 4, comment: 'Convenient location with a smooth check-in.' },
    ];
  },
};

export default mockApi;
