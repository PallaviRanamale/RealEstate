# Real Estate Platform

A full-stack real estate listing platform built with React, Node.js, and MongoDB. Users can browse, search, and list properties with real-time chat functionality.

## Features

- 🏠 Property Listings: Browse and search properties with filters (price, location, type)
- 📍 Interactive Map: View properties on an interactive map using Leaflet
- 💬 Real-time Chat: Communicate with property owners via Socket.io
- 👤 User Authentication: Secure registration and login with JWT
- 📝 Property Management: Create, update, and manage property listings
- 💾 Save Properties: Save favorite properties for later viewing
- 🖼️ Image Upload: Upload multiple images for property listings

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Vite
- Leaflet (Maps)
- Socket.io Client
- Axios
- Zustand (State Management)
- SCSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- MongoDB
- JWT Authentication
- Bcrypt

### Real-time Communication
- Socket.io Server

## Project Structure

```
Real Estate Project/
├── client/          # React frontend application
├── api/            # Express.js backend API
└── scoket/         # Socket.io server for real-time chat
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/PallaviRanamale/RealEstate.git
cd RealEstate
```

2. Install dependencies for each service:

```bash
# Install API dependencies
cd api
npm install

# Install Client dependencies
cd ../client
npm install

# Install Socket server dependencies
cd ../scoket
npm install
```

3. Set up environment variables:

Create a `.env` file in the `api` directory:
```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Set up Prisma:
```bash
cd api
npx prisma generate
npx prisma db push
```

### Running the Application

1. Start the API server:
```bash
cd api
npm start
```

2. Start the Socket server:
```bash
cd scoket
node app.js
```

3. Start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:8800
- Socket: http://localhost:4000

## Features in Detail

### Property Listings
- Filter by price range, property type, and location
- View properties on an interactive map
- Detailed property pages with images and descriptions

### User Features
- Secure authentication with JWT tokens
- User profiles with avatar upload
- Save favorite properties
- Create and manage property listings

### Real-time Chat
- Instant messaging between users
- Online/offline status
- Message history

## License

ISC

## Author

Pallavi Ranamale

