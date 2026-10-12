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

Account settings use the authenticated `PUT /users/me` endpoint to update a user's name, email, and phone, `PATCH /users/me/password` with `{ "newPassword": "..." }` to change the password, and `DELETE /users/me` to permanently remove the current account.

Password recovery sends `POST /auth/forgot-password` with `{ "email": "..." }` to request an email verification code, then verifies it through `POST /auth/verify-reset-code` with `{ "email": "...", "code": "..." }`. Only after verification succeeds does the frontend show the new-password and confirm-password fields. It submits `POST /auth/reset-password` with `{ "email": "...", "code": "...", "newPassword": "..." }`; the backend is responsible for sending and validating the code. In mock mode, these password operations return success without sending email or persisting a password change.

In mock mode, profile updates are stored in the browser and deleting the account clears the local session.
