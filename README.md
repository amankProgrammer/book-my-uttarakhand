# Book our Uttarakhand (React + Vite)

Marketing website for Uttarakhand travel, packages, hotels, and destination weddings.

## Tech stack

- React 19
- React Router 6
- Vite 7
- ESLint 9

## Quick start

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173` by default.

## Available scripts

- `npm run dev`: start development server
- `npm run build`: production build
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint

## Environment variables

Create `.env.local` in project root (or copy `.env.example` -> `.env.local`):

```env
VITE_ENQUIRY_ENDPOINT=https://your-api.example.com/enquiry
VITE_NEWSLETTER_ENDPOINT=https://your-api.example.com/newsletter
```

### Firebase CMS (recommended $0 setup)

This project includes a lightweight admin panel at `/admin` powered by Firebase (Auth + Firestore + Storage).

1) Create a Firebase project
2) Enable **Authentication -> Email/Password**
3) Create **Firestore Database** and **Storage**
4) Copy `app/.env.example` to `app/.env.local` and fill in your Firebase web config values
5) Set your bootstrap admin email(s) in:
   - `app/firestore.rules` (replace `you@example.com`)
   - `app/storage.rules` (replace `you@example.com`)
   - `VITE_BOOTSTRAP_ADMIN_EMAILS` in `app/.env.local` (UI helper)
6) Deploy rules using Firebase CLI (or paste them in the Firebase Console):

```bash
# from /app
firebase deploy --only firestore:rules,storage
```

7) Create a Firebase Auth user (Console -> Authentication -> Users)
8) Open `http://localhost:5173/admin`, sign in, click **Make me admin**, then use **Seed defaults**

Notes:
- Home page sections now read from Firestore collections:
  - `heroSlides`
  - `homeDestinations`
  - `homePackages`
- Enquiry form and newsletter will save to Firestore (`enquiries`, `newsletterSignups`) when endpoints are not configured.

### Expected form payloads

`VITE_ENQUIRY_ENDPOINT` receives:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "source": "bookouruttarakhand-enquiry",
  "submittedAt": "ISO date string"
}
```

`VITE_NEWSLETTER_ENDPOINT` receives:

```json
{
  "email": "string",
  "source": "bookouruttarakhand-newsletter",
  "submittedAt": "ISO date string"
}
```

Both endpoints should return `2xx` for success.

## Content workflow

- Home sections: `src/components/*`
- Route pages:
  - `src/pages/TourPackages.jsx`
  - `src/pages/HotelsResorts.jsx`
  - `src/pages/UttarakhandDestination.jsx`
- Global styling: `src/style.css`
- Page-level styling: `src/pages/pages.css`

## Media workflow

Hero videos are in `src/assets/videos/` and are now rendered one-at-a-time for better performance.

Optional local compression (requires ffmpeg installed):

```bash
ffmpeg -i input.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4
```

Replace heavy originals with optimized files of the same names after validation.

## Notes

- Mobile and reduced-motion users get an image fallback in the hero section.
- Navigation and controls were updated for keyboard/accessibility support.
