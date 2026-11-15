# Maka Frontend

The frontend application for **Maka**, a lightweight e-commerce platform designed to help merchants sell products online and better understand their business activity.

Maka follows a simple product philosophy:

**Sell → Observe → Understand → Improve → Sell more.**

The application is designed around a mobile-first experience, with a product discovery feed and dedicated tools for merchants.

## Tech Stack

- **Library:** React 19
- **Language:** TypeScript
- **Build tool:** Vite
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Phone input:** React Phone Number Input

## Features

The frontend currently includes:

- **Product discovery:** a feed-oriented interface for browsing products.
- **Product pages:** individual product views.
- **Shopping cart:** cart state management connected to the backend API.
- **Authentication:** phone number and OTP verification flows.
- **Identity management:** centralized identity state and protected routes.
- **Seller onboarding:** store creation and product publishing flows.
- **Seller dashboard:** merchant-facing application structure.
- **Product management:** product creation and editing interfaces.
- **Orders:** buyer-facing order pages.
- **Notifications:** centralized notification state and notification interfaces.
- **Search:** product discovery interface.

Some screens and workflows are still under development, and some parts of the application still use mock data.

## Project Structure

```text
src/
├── api/
├── app/
├── assets/
├── components/
│   ├── cart/
│   ├── feed/
│   ├── navigation/
│   ├── notification/
│   ├── product/
│   ├── seller/
│   └── ui/
├── contexts/
├── data/
├── guards/
├── layouts/
├── pages/
│   ├── auth/
│   ├── home/
│   ├── not-found/
│   ├── products/
│   └── seller/
├── services/
└── types/
```

### Application Architecture

The application separates responsibilities into dedicated modules:

- **API:** centralized HTTP client.
- **Services:** communication with backend endpoints.
- **Contexts:** shared application state, including identity, cart and notifications.
- **Components:** reusable interface elements.
- **Pages:** application screens.
- **Guards:** route access control.
- **Layouts:** shared page structures.
- **Types:** TypeScript data models.

## Getting Started

### Prerequisites

- Node.js
- npm
- The Maka backend API

### Installation

Clone the repository:

```bash
git clone https://github.com/espada5376/maka-frontend.git
cd maka-frontend
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Set this variable to the URL of your running Maka backend API.

### Run the Development Server

```bash
npm run dev
```

Vite will start the local development server and provide a URL in the terminal.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Backend Integration

The frontend communicates with the Maka backend through a centralized API client.

The HTTP client provides:

- Centralized API request handling.
- JSON request and response handling.
- Cookie-based session support using `credentials: "include"`.
- Centralized API error handling.

The backend repository:

[Maka Backend](https://github.com/espada5376/maka-backend)

## Current Development Status

Maka is an actively developed personal project.

Current development priorities include:

- Expanding frontend and backend integration.
- Completing merchant workflows.
- Connecting product and store management interfaces.
- Improving the shopping and ordering experience.
- Refining the mobile-first user experience.

The project is being developed incrementally, with an emphasis on maintainable components, clear application state and a consistent API integration strategy.

## Project Philosophy

Maka is not intended to be just another online storefront.

Its goal is to provide merchants with lightweight tools to sell products, observe customer interactions, understand their performance and make better business decisions.
