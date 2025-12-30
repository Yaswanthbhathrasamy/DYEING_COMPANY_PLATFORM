# B2B Dyeing Company Platform

A real-time B2B platform for textile dyeing services, featuring a service catalog, quote management, and live order tracking.

## Technology Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Socket.io-client
- **Backend:** Node.js, Express, MongoDB, Socket.io, JWT

## Prerequisites
- Node.js (v16+)
- MongoDB (Running locally on port 27017)

## Setup Instructions

### 1. Backend Setup
```bash
cd server
npm install
# Ensure .env exists with correct MONGO_URI
node index.js
```
The server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The client runs on `http://localhost:5173`.

## Features
- **Public Website:** Home, Services, About, Contact pages.
- **Buyer Panel:**
  - Browse Services & Add to Cart.
  - Request Quotations.
  - Track Order Status (Live progress bar).
  - Real-time notifications.
- **Admin Panel:**
  - specific login credential (create first user via register then manually change role to 'admin' in DB or use seed script if provided).
  - Manage Services (CRUD).
  - Respond to Quotes.
  - Update Order Status (Dyeing -> Washing -> etc.).

## Real-time Events
- Socket.io is used to push updates from Admin to Buyer instantly.
- Try opening two browsers: one as Admin, one as Buyer to see updates live.

## Notes
- Images are currently using placeholders.
- GST and Phone validation are basic regex in frontend.
