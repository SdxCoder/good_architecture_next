
# 🧱 Project Architecture Overview

This architecture is organized into **three primary layers**:

- `/app`: Entry points, routing, and page composition
- `/domains`: Domain-specific logic, components, and APIs
- `/shared`: Globally reusable utilities, models, components, and state

It follows **Domain-Driven Design (DDD)** principles while encouraging modularity, separation of concerns, and scalability.

---

## 📂 Folder Structure

```
/app                → Pages, routing, and layout
/domains            → Feature-specific logic (auth, products, etc.)
/shared             → Globally shared logic and components
```

---

## 🔷 `/app` — Application Layer

Handles:

- Route definitions (`page.tsx`)
- Layouts and global page wrappers
- Page-level data fetching and composition

Example:

```
/app
  /auth
    page.tsx
  /products
    page.tsx
  layout.tsx
  globals.ts
```

> Should stay thin and only import from `domains` and `shared`.

---

## 🔶 `/domains` — Domain Layer

Each domain (e.g., `auth`, `products`) encapsulates all logic and components for that feature area.

```
/domains
  /auth
    /components       → UI components specific to auth
    /stores           → Zustand stores for auth state
    /repository       → Interfaces with services, handles errors/caching
    /services         → API calls and business logic
    /models           → TypeScript types and entities
    /hooks            → Custom hooks (e.g., useLogin)
    /utils            → Auth-specific utilities
    index.ts          → Barrel exports for the domain
  /products
    ...
```

> Each folder is optional but helps enforce consistent organization.

---

## ♻️ `/shared` — Shared Layer

Contains logic and components **used across multiple domains**.

```
/shared
  /components         → Reusable UI components (Button, Modal, etc.)
  /stores             → Global Zustand stores (theme, auth token, etc.)
  /utils              → General-purpose utility functions
  /models             → Global types and interfaces
  /hooks              → Generic hooks (useDebounce, useMediaQuery, etc.)
  /styles             → Tailwind config, global styles
```

> Structure mirrors `domains` for familiarity and ease of migration.

---

## ✅ Design Principles

| Principle              | Description |
|------------------------|-------------|
| **Consistency**        | Identical structure in `domains` and `shared` for easier navigation |
| **Modularity**         | Each domain is self-contained and scalable independently |
| **Reusability**        | `shared/` promotes cross-domain usage without duplication |
| **Separation of Concerns** | UI, state, API, and utility logic are isolated cleanly |

---

## 🧭 Usage Guidelines

- ✅ Place logic **specific to a domain** in its `/domains/[name]/` folder.
- ✅ Place **shared logic** in `/shared/`.
- ❌ Avoid importing `shared` modules from inside `domains` unless the module is designed to be reused.
- ❌ Do not mix domain logic in `/app`.

---

## 📌 Summary

This architecture:

- Scales well with growing feature sets
- Keeps code organized by business concern
- Improves codebase readability and collaboration
- Encourages reuse without sacrificing clarity
