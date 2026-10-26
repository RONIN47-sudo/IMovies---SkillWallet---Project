# 🎬 IMovies — SkillWallet Project

### Discover Movies. Explore Cinema. Experience Booking.

IMovies is a cinematic movie discovery and demo ticket-booking web application built with **Next.js, React, and TypeScript**. It provides users with an interactive platform to explore movies, discover film details, manage their watchlists, and experience an end-to-end cinema booking workflow.

The project combines a dark cinematic interface with movie data integration, interactive seat selection, booking management, and a simulated payment experience.

> **Project:** IMovies – SkillWallet Project
> **Project Type:** Full-Stack Web Application Prototype
> **Status:** Working Prototype
> **Primary Framework:** Next.js

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Technology Stack](#-technology-stack)
* [Application Workflow](#-application-workflow)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Booking and Payment Disclaimer](#-booking-and-payment-disclaimer)
* [Future Enhancements](#-future-enhancements)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🎯 Overview

IMovies aims to bring movie discovery and the cinema booking experience together in a single web application.

Users can browse movies, explore individual movie pages, search for films, maintain a personal watchlist, and navigate through a simulated ticket-booking process.

The booking workflow includes cinema selection, showtime and date selection, interactive seat selection, checkout, payment method selection, and booking confirmation.

The application also provides a **My Bookings** section where users can review their bookings and cancel them within the prototype.

Movie information is retrieved from **The Movie Database (TMDB)** API.

---

## ✨ Features

### 🎥 Movie Discovery

* Browse movies through a cinematic interface.
* Explore individual movie detail pages.
* View movie information and poster artwork.
* Discover movies using the search functionality.
* Filter movies by genre.

### ❤️ Watchlist Management

* Add movies to a personal watchlist.
* Remove movies from the watchlist.
* Retain watchlist data using browser local storage.

### 🎟️ Cinema Booking Experience

* Select a cinema from the available options.
* Browse available showtimes.
* Choose a preferred date.
* Interact with a visual seat-selection interface.
* Select seats and calculate the booking total.
* Review booking information at checkout.

### 💳 Simulated Checkout

* Select a payment method.
* Review the booking amount.
* Complete the demonstration payment flow.
* Generate a booking reference.
* View the booking confirmation.

### 📋 My Bookings

* View saved booking information.
* Display movie titles and posters.
* Review selected seats and booking details.
* View booking status.
* Cancel a booking.
* Retain booking records across page refreshes using browser local storage.

### 🎨 User Interface

* Dark cinematic visual design.
* Responsive web interface.
* Interactive UI components.
* Smooth animations and transitions.

---

## 🛠️ Technology Stack

| Technology            | Purpose                                       |
| --------------------- | --------------------------------------------- |
| Next.js               | Application framework and routing             |
| React                 | Component-based user interface                |
| TypeScript            | Type-safe application development             |
| Tailwind CSS          | Utility-first styling                         |
| Framer Motion         | UI animations and transitions                 |
| Lucide React          | Icons and interface elements                  |
| TMDB API              | Movie information and metadata                |
| Browser Local Storage | Client-side watchlist and booking persistence |
| Git                   | Version control                               |
| GitHub                | Source code hosting                           |

---

## 🔄 Application Workflow

The main booking workflow follows these steps:

```text
Movie Discovery
      │
      ▼
Movie Details
      │
      ▼
Cinema Selection
      │
      ▼
Date & Showtime Selection
      │
      ▼
Interactive Seat Selection
      │
      ▼
Checkout & Booking Summary
      │
      ▼
Payment Method Selection
      │
      ▼
Simulated Payment
      │
      ▼
Booking Confirmation
      │
      ▼
My Bookings
      │
      ▼
View or Cancel Booking
```

Users can also browse movies, search for titles, filter by genre, and manage their watchlists independently of the booking workflow.

---

## 📁 Project Structure

The application follows the Next.js App Router structure.

```text
imovies/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── movies/
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   │
│   │   ├── booking/
│   │   │   ├── [cinemaID]/
│   │   │   │   ├── checkout/
│   │   │   │   ├── seats/
│   │   │   │   └── page.tsx
│   │   │   ├── confirmation/
│   │   │   └── page.tsx
│   │   │
│   │   ├── movie/
│   │   │   └── [id]/
│   │   │
│   │   ├── my-bookings/
│   │   ├── search/
│   │   ├── watchlist/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── BookingConfirmationClient.tsx
│   │   ├── CinemaShowtimes.tsx
│   │   ├── DateSelector.tsx
│   │   ├── GenreFilter.tsx
│   │   ├── MovieBrowser.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieSection.tsx
│   │   ├── PaymentSection.tsx
│   │   ├── SeatMap.tsx
│   │   ├── WatchlistButton.tsx
│   │   └── WatchlistNavLink.tsx
│   │
│   └── lib/
│       ├── bookings.ts
│       ├── tmdb.ts
│       ├── types.ts
│       └── watchlist.ts
│
├── .gitignore
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

*Note: This structure highlights the main application files. Additional configuration files and assets may also be present.*

---

## 🚀 Getting Started

Follow these steps to run IMovies locally.

### Prerequisites

Ensure that you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Git
* A TMDB API key

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/IMovies-SkillWallet-Project.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Navigate to the project directory

```bash
cd IMovies-SkillWallet-Project
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a file named `.env.local` in the project root and add your TMDB API key:

```env
TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your actual API key.

**Security note:** Never commit `.env.local` or expose your API key in public source code.

### 5. Start the development server

```bash
npm run dev
```

### 6. Open the application

Visit:

```text
http://localhost:3000
```

The application should now be available in your browser.

---

## 🔑 Environment Variables

IMovies uses an environment variable to configure access to the TMDB API.

| Variable       | Description                                          | Required |
| -------------- | ---------------------------------------------------- | -------- |
| `TMDB_API_KEY` | API key used to retrieve movie information from TMDB | Yes      |

Keep your actual API key private.

For local development, store it in `.env.local`. For a deployed application, configure the variable through your hosting provider's environment settings.

---

## ⚠️ Booking and Payment Disclaimer

**IMovies is currently a working prototype, not a production ticket-booking platform.**

The booking and checkout functionality demonstrates the user experience of an online cinema reservation system.

Please note:

* Payments are simulated; no real money is charged.
* Cinema selections and showtimes are part of the prototype experience and should not be assumed to reflect live cinema availability.
* Booking records are stored in browser local storage rather than a centralized booking database.
* Booking confirmation does not constitute a real cinema ticket.
* Booking cancellation updates the locally stored booking status and does not cancel a reservation with an actual cinema.

Do not use the application to make real ticket reservations or payments.

---

## 🚧 Future Enhancements

Potential areas for further development include:

* Integration with a persistent database.
* User authentication and individual accounts.
* Server-side booking management.
* Real-time cinema and showtime availability.
* Prevention of duplicate seat reservations.
* Integration with a legitimate payment gateway in a properly secured environment.
* Booking history synchronized across devices.
* Improved validation, error handling, and automated testing.
* Deployment to a public hosting platform.

These are potential future improvements and are not claimed as existing features.

---

## 🤝 Contributing

Suggestions, feedback, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Open a pull request describing your contribution.

---

## 📄 License

No open-source license has been specified for this project yet.

Until a license is added, all rights remain with the copyright holder. Public visibility on GitHub does not automatically grant permission to reuse, modify, or redistribute the code.

---

## 🙌 Acknowledgements

* [The Movie Database (TMDB)](https://www.themoviedb.org/) — Movie metadata and artwork.
* [Next.js](https://nextjs.org/) — Application framework.
* [React](https://react.dev/) — User interface library.
* [Tailwind CSS](https://tailwindcss.com/) — Styling utilities.
* [Lucide](https://lucide.dev/) — Icons.

Movie data and images are provided through TMDB. IMovies is an independent project and is not affiliated with or endorsed by TMDB.

---

**IMovies — A cinematic movie discovery and booking experience.** 🎬
