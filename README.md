This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Project Overview: 

This project is built with the latest version of Next.js and follows best practices for performance, maintainability, and modern frontend development. It utilizes Incremental Static Regeneration (ISR), dynamic route generation, and client-side interactivity with React Query for data-fetching and mutations for performing cruid operations on Admin Page.

🧱 Features
✅ Static & Server-Side Rendering
/posts Page
Statically generated Posts Page using ISR for optimized performance to refetch after 1min for latest posts.  Displays a list of blog posts.

/post/[id] Page
Statically generated posts pages according to thier IDs at build time using generateStaticParams() and Dynamically generated using Next.js Incremental Static Regeneration. Each post page is statically generated at request time and cached for future visits. after 1 min, data is refetched using ISR to get latest post detail for the provided postID.

✅ Client-Side Admin Interface
/admin Page
A fully client-side page built as a React component.

Uses React Query for data fetching and mutations.

Handles CRUD operations (Create, View, Update, Delete).

have perforeed query inavlidating to refetch data from backend, but data doesnot update on server — so state changes are managed on the client-side as well for this page.

Optimistic updates and responsive user experience.

UI/UX & Styling
Dark Mode toggle supported with class dark added.

Fully responsive design, mobile and tablet friendly.

ShadCN customized components such as Table, Modal, Toast Message according to the application requirements with custom classes and UI, based on the data.

Built with shadcn/ui components for modern, accessible design patterns.

Includes reusable components:

NavBar – Navigation across the site.

DarkModeToggle – Switch between light and dark themes.

Icons – SVGs and Centralized and customizable icon components using Lucide.

Route Paths:
1: localhost:3000/ = posts page (ISR) Server-side.
2: localhost:3000/posts/[id] = selected post detail page (ISR) with generate Static Params Server-side.
3: localhost:3000/admin = client side page with React=Query performing CRUID operations.

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
