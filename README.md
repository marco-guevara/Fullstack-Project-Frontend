# Baldo Frontend

React/Vite frontend for **Baldo**, a premium urban apparel e-commerce project.

This application is part of a full-stack academic project. It consumes the Baldo backend API and provides the user interface for authentication, product browsing, cart management, checkout, and profile updates.

**Author:** Marco Guevara

## Project Overview

Baldo is an e-commerce frontend built with React. The application connects to a deployed Express/MongoDB backend and allows users to:

- Register and log in
- Browse products
- View product details
- Add products to the cart
- Update cart quantities
- Remove cart items
- Complete checkout
- View checkout confirmation
- Update profile and delivery information

## Tech Stack

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS
- Netlify deployment configuration

## Backend API

The frontend is designed to work with the Baldo backend API.

Production backend:

```text
https://fullstack-project-backend-bhd4.onrender.com
```

In production, Netlify redirects frontend requests from `/api/*` to the backend using `netlify.toml`.

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_API_BASE_URL=/api
```

For local development without the Netlify proxy, this value can be changed to the backend URL if needed.

## Installation

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Main Routes

- `/` - Authentication gateway
- `/login` - Login form
- `/register` - Register form
- `/home` - Authenticated home page
- `/shop` - Product catalogue
- `/products/:productId` - Product detail page
- `/cart` - Shopping cart
- `/order-success` - Checkout success page
- `/profile` - User profile page

Protected routes require an authenticated user session.

## Project Structure

```text
src/
  components/
  context/
  pages/
  routes/
  services/
  App.jsx
  main.jsx
```

Important folders:

- `components/` contains shared UI components.
- `context/` contains authentication state and helpers.
- `pages/` contains route-level React pages.
- `routes/` contains protected route logic.
- `services/` contains API request modules.

## Notes

This project was built for academic purposes as the React/Vite frontend of a full-stack e-commerce application.

## License

This project uses the ISC license.
