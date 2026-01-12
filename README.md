This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Folder Structure 

bookworm-client/
├── public/                     # Static assets (favicon, images, book covers)
│   ├── images/
│   │   ├── books/
│   │   └── users/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── app/                     # Next.js App Router (if using App Router)
│   │   ├── layout.tsx           # Main layout with Navbar/Footer
│   │   ├── page.tsx             # Default route logic
│   │   ├── admin/               # Admin pages
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── books/
│   │   │   │   ├── add.tsx
│   │   │   │   ├── edit/[id].tsx
│   │   │   │   └── list.tsx
│   │   │   ├── genres/
│   │   │   │   ├── add.tsx
│   │   │   │   └── edit/[id].tsx
│   │   │   ├── users/
│   │   │   │   └── list.tsx
│   │   │   ├── reviews/
│   │   │   │   └── moderate.tsx
│   │   │   └── tutorials/
│   │   │       └── manage.tsx
│   │   ├── user/                # User pages
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── browse/
│   │   │   │   └── page.tsx
│   │   │   ├── library/
│   │   │   │   └── page.tsx
│   │   │   ├── book/
│   │   │   │   └── [id].tsx
│   │   │   └── tutorials/
│   │   │       └── page.tsx
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   └── components/          # Page-specific components
│   │       └── ...
│   ├── components/              # Shared reusable components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── BookCard.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── RatingStars.tsx
│   │   ├── Carousel.tsx
│   │   └── LoadingSpinner.tsx
│   ├── context/                 # React Context for auth, theme, user data
│   │   ├── AuthContext.tsx
│   │   └── BookContext.tsx
│   ├── hooks/                    # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useBooks.ts
│   │   └── usePagination.ts
│   ├── services/                # API calls (Axios/Fetch)
│   │   ├── authService.ts
│   │   ├── bookService.ts
│   │   ├── genreService.ts
│   │   ├── reviewService.ts
│   │   └── tutorialService.ts
│   ├── types/                   # TypeScript types/interfaces
│   │   ├── book.ts
│   │   ├── user.ts
│   │   ├── review.ts
│   │   └── tutorial.ts
│   ├── utils/                   # Utility functions
│   │   ├── formatDate.ts
│   │   ├── calculateProgress.ts
│   │   └── protectedRoute.tsx
│   ├── styles/                  # CSS/SCSS or Tailwind configs
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── components/
│   └── assets/                  # Local assets like SVGs, icons
│
├── .env.local                   # Environment variables (API URL, keys)
├── next.config.js               # Next.js config
├── tsconfig.json                # TypeScript config
├── package.json
└── README.md

