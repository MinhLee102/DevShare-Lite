## 🧑‍🎓 Basic Information
- **University:** University of Engineering and Technology, VNU
- **Name:** Lê Đức Minh
- **Student ID:** 23020683

---
> This README only provides project overview, tech stack, directory structure and installation & setup on local computer. 

> For **Database design**, access: [Database Design](DATABASE_DESIGN.md)

> For details on **web's features**, access: [Features](FEATURES.md)

---
## Project Overview

DevShare Lite is a web application designed as a social platform for developers. It allows users to share IT knowledge with each other, through posting articles in markdown or through discussions with a comment system. Inspired by others similar social web like Reddits, Stack Overflow, … DevShare Lite also features ‘infinite scroll’, providing users with a better experience. Search engines are also incorporated, helping users in finding posts with the desired theme.

---

## Project Tech Stack

### Frontend

-   **Framework:** Next.js 13+ (App Router) - using Server Components for performance and Client Components for interactive features.
-   **Language:** TypeScript - For type safety and better developer experience.
-   **Styling:** Tailwind CSS - a fast and flexible CSS framework for building user interfaces.
-   **State Management:** React Context API for global authentication state management.
-   **Data Fetching:** `axios` with interceptors to handle API requests and attach tokens automatically.
-   **UI/UX:** `react-markdown` for rendering Markdown content, `lucide-react` for icons.

### Backend

-   **Framework:** Django, Django Rest Framework (DRF)
-   **Authentication:** `dj-rest-auth` with `django-allauth` to handle user signup, login, password management and `djangorestframework-simplejwt` for secure token-based (JWT) authentication.
-   **Database:** PostgreSQL - A powerful, open-source object-relational database system.
-   **API Features:** Nested routers (`drf-nested-routers`) to organize comments in each post and built-in filtering (`django-filter`) for search functionality.
-   **CORS:** `django-cors-headers` to manage cross-origin requests from the frontend.

---

## Project Directory Structure

### `source_code/frontend/`

```
frontend/
└── src/
    ├── app/            # Main application routes (App Router)
    │   ├── login/
    │   ├── posts/
    │   │   ├──[id]/
    │   │   ├── create/
    │   │   └── edit/[id]/
    │   ├── profile/
    │   ├── search/
    │   ├── signup/
    │   ├── page.tsx    # Homepage
    │   └── layout.tsx  # Overall Layout
    ├── components/     # Reusable React components (Post, CommentBox, etc.)
    ├── context/        # React Context for global state (AuthContext)
    ├── types/          # Global TypeScript type definitions (interfaces)
    └── utils/          # Utility functions, especially for API calls
```

### `source_code/backend/`

```
backend/
├── backend/        # Django project configuration (settings.py, urls.py)
├── comments/       # Django app for Comments
├── posts/          # Django app for Posts and Tags
├── users/          # Django app for custom User model and Profile
├── utils/          # Utilities function
├── manage.py       # Django's command-line utility
└── requirement.txt # Python dependencies for the backend
```

---

## Installation and Setup Guide

### Required Environment

-   Node.js: v22.17.0
-   Python: 3.13.5
-   PostgreSQL: 9.4

### Frontend and Backend Setup

#### #Frontend:

1.  Navigate to the frontend directory: `cd source_code/frontend`
2.  Install dependencies: `npm install`
3.  Start the frontend development server: `npm run dev` ( local server often is `http://localhost:3000` )

#### #Configure PostgreSQL database (using pgAdmin):

1.  Create a new database.
2.  Right-click at the created database → choose Restore.
3.  Choose `Devshare.sql` in `source_code/backend`.

#### #Backend:

1.  Navigate to the backend directory: `cd source_code/backend`
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies: `pip install -r requirement.txt`
4.  Configure your PostgreSQL database and update the `DATABASES` setting in `backend/settings.py`.
5.  Run database migrations: `python manage.py migrate`
6.  Start the backend server: `python manage.py runserver`