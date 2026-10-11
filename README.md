# ParkEase Frontend

ParkEase is a modern parking marketplace frontend built with React, Vite, and Tailwind CSS. It is designed to work with a Spring Boot backend API while using a mock API layer during early development.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Demo credentials

- Seeker: `seeker@demo.com` / `demo123`
- Provider: `provider@demo.com` / `demo123`
- Admin: `admin@demo.com` / `demo123`

## Switching between mock and backend

Set `VITE_USE_MOCK=true` in your `.env` file to use the included mock API.

Set `VITE_USE_MOCK=false` and ensure `VITE_API_URL` points to your Spring Boot backend, for example:

```env
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=false
VITE_RAZORPAY_KEY=rzp_test_demo_key
```

The app is structured so pages only call endpoint helpers from `src/api/endpoints.js`, while the `axios.js` and `mockApi.js` layers are isolated behind that contract.

