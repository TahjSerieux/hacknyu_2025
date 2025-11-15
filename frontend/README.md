# Frontend Application

This is the frontend of the project, built with Next.js and React.

## What is this?

This is a web application that users interact with in their browser. It's built with:
- **Next.js** - A React framework that makes building web apps easier
- **React** - A JavaScript library for building user interfaces
- **TypeScript** - JavaScript with type checking for better code quality
- **Tailwind CSS** - A utility-first CSS framework for styling

## What's Inside?

The main application is in the `my-app` folder:

```
my-app/
├── app/                  # Main application code
│   ├── page.tsx         # Home page
│   └── layout.tsx       # Layout wrapper for all pages
├── public/              # Static files (images, etc.)
├── package.json         # Project configuration and dependencies
└── next.config.ts       # Next.js configuration
```

## How Next.js Works

Next.js uses a file-based routing system:
- Files in the `app/` folder automatically become pages
- `page.tsx` files define what's shown on each page
- `layout.tsx` wraps all pages with common elements (like headers/footers)

## Prerequisites

Before you can run the frontend, you need:

- **Node.js** installed on your computer (version 18 or higher recommended)
  - Download from: https://nodejs.org/
  - To check if you have it: `node --version`
- **npm** (comes with Node.js)
  - To check: `npm --version`

## How to Run

Follow these steps to get the frontend running:

### 1. Navigate to the App Folder

From the `frontend` directory, go into the `my-app` folder:

```bash
cd my-app
```

### 2. Install Dependencies

Install all the required packages:

```bash
npm install
```

This might take a few minutes the first time. It downloads all the libraries listed in `package.json`:
- Next.js, React, React DOM
- TypeScript and type definitions
- Tailwind CSS
- OpenAI library (for AI features)
- XYFlow (for flowchart/diagram features)
- And their dependencies

### 3. Start the Development Server

Run the development server:

```bash
npm run dev
```

You should see output like:
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
```

### 4. View in Browser

Open your web browser and go to:

```
http://localhost:3000
```

You should see the Next.js welcome page!

### 5. Make Changes

While the dev server is running:
- Edit any file in the `app/` folder
- Save your changes
- The browser will automatically refresh to show your updates (called "Hot Module Replacement")

Try editing `app/page.tsx` to see your changes in real-time!

## Stopping the Server

To stop the development server, press `Ctrl + C` in the terminal where it's running.

## Available Commands

From the `my-app` folder, you can run:

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build the app for production
- `npm start` - Run the production build (must build first)
- `npm run lint` - Check code for errors and style issues

## Environment Variables

If your app needs API keys or other secrets:

1. Create a `.env.local` file in the `my-app` folder
2. Add your variables:
   ```
   OPENAI_API_KEY=your_key_here
   NEXT_PUBLIC_API_URL=http://localhost:3004
   ```
3. Access them in your code with `process.env.VARIABLE_NAME`

**Note:** Variables starting with `NEXT_PUBLIC_` are accessible in the browser. Others are only available on the server.

## Common Issues

### "Port 3000 already in use"
Another app is using port 3000. You can:
- Stop the other app
- Or run on a different port: `npm run dev -- -p 3001`

### "Module not found" errors
Dependencies aren't installed. Run `npm install` again.

### TypeScript errors
If you see red squiggly lines in your editor, make sure you have TypeScript support installed in your code editor (like the TypeScript extension for VS Code).

## Project Structure Explained

```
my-app/
├── app/                    # Application code
│   ├── page.tsx           # Home page (http://localhost:3000)
│   ├── layout.tsx         # Root layout (wraps all pages)
│   └── flow_chart/        # Flow chart page (http://localhost:3000/flow_chart)
│       └── page.tsx
├── public/                 # Static files (accessible at /)
├── node_modules/           # Installed dependencies (don't edit)
├── package.json            # Project config
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind CSS config
└── next.config.ts         # Next.js config
```

## Connecting to the Backend

To make API calls to your backend:

```typescript
// Example: Fetching data from the backend
const response = await fetch('http://localhost:3004');
const data = await response.json();
console.log(data.message); // "Hello, World"
```

## Next Steps

Once you're comfortable with the basics:
- Learn about React components and props
- Explore Next.js routing (create new pages)
- Learn how to use React hooks (useState, useEffect)
- Style components with Tailwind CSS
- Connect to your backend API
- Add forms and handle user input

## Helpful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
