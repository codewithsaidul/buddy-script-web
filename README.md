# BuddyScript Web - Social Platform Frontend

BuddyScript Web is the modern, responsive frontend for the BuddyScript social ecosystem. Built with **Next.js 15 (App Router)** and **TypeScript**, it offers a seamless and interactive user experience.

---

## 🚀 Features

- **Dynamic Feed:** Real-time-like post scrolling with optimized image loading.
- **Responsive Layout:** Fully optimized for Desktop, Tablet, and Mobile with dedicated navigation (Sidebar for desktop, Bottom Nav for mobile).
- **Authentication Flow:** Secure Login and Registration with Zod validation and JWT handling.
- **Social Interactions:** Create posts, like, and comment with nested reply support.
- **Theme Support:** Dark and Light mode toggle using a shared `ThemeToggle` component.
- **Server-Side Rendering (SSR):** Optimized SEO and performance using Next.js server components and services.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Custom CSS Modules
- **State Management:** React Hooks & Next.js Server Actions/Services
- **Form Validation:** Zod
- **Icons:** Custom SVG Components & Flaticon/FontAwesome integration

---

## 📂 Project Structure Highlights

```text
src
├── app              # Next.js App Router (Auth, Feed, Public Routes)
├── components
│   ├── layout       # Navbar, Sidebars, Mobile Navigation
│   ├── modules      # Feature-specific components (Auth, Post, Feed)
│   └── shared       # Reusable UI (Buttons, Inputs, Toggles)
├── service          # API Service layer (Auth, Posts, Comments)
├── utils            # Helpers (JWT handlers, Formatters, Validators)
└── validation       # Zod schemas for client-side validation

```


## ⚙️ Getting Started

### Prerequisites
- [Bun](https://bun.sh/) or Node.js installed.
- Backend API (**BuddyScript Core**) running.

### Installation

1. **Clone the repository:**
```bash
   git clone <your-repo-link>
   cd buddy-script-web
```


2. **Install dependencies:**
```Bash
bun install
```


3. **Environment Setup:**
Create a .env.local file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
JWT_SECRET =your-access-secret
```


4. **Start the development server:**

```Bash
bun run dev
```



## 🔍 Key Components & Services

- **Services:** All API calls are abstracted into the `service/` directory (e.g., `post.service.ts`) for clean logic separation.
- **Layouts:** Uses a flexible layout system with `LeftSidebar` and `RightSidebar` that adapts to different screen sizes.
- **Auth:** Uses custom `tokenHandlers` to manage JWTs securely on the client/server side.

---

## 🛡️ Validation & Security

- **Client-Side:** Forms are validated using **Zod** before submission.
- **Protected Routes:** Handled via Next.js middleware and `checkAuth` logic to prevent unauthorized access to the feed.

---

## 👨‍💻 Author

**Saidul Rana** *Full Stack Developer*