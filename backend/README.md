# Backend Server

This is the backend server for the project. It's built with Node.js and Express.

## What is this?

This is a simple API server that handles requests from the frontend. It uses Express, which is a popular framework for building web servers in Node.js.

## What's Inside?

- `server.js` - The main server file that creates and configures the Express server
- `package.json` - Contains information about the project and its dependencies

## How the Server Works

The server:
1. Imports the Express framework
2. Creates an Express application
3. Sets up a single route at the root path (`/`)
4. Listens for requests on port 3004

When you visit `http://localhost:3004/`, the server responds with a JSON message: `{"message":"Hello, World"}`

## Prerequisites

Before you can run the backend, you need:

- **Node.js** installed on your computer (version 14 or higher recommended)
  - Download from: https://nodejs.org/
  - To check if you have it: `node --version`

## How to Run

Follow these steps to get the backend server running:

### 1. Install Dependencies

Open your terminal in this `backend` folder and run:

```bash
npm install
```

This command downloads and installs all the packages listed in `package.json` (in this case, Express).

### 2. Start the Server

After installation is complete, start the server with:

```bash
npm start
```

You should see the server running, though it won't print any message by default.

### 3. Test the Server

Open your web browser and go to:

```
http://localhost:3004
```

You should see:
```json
{"message":"Hello, World"}
```

Alternatively, you can test it from another terminal using curl:

```bash
curl http://localhost:3004
```

## Stopping the Server

To stop the server, press `Ctrl + C` in the terminal where it's running.

## Common Issues

### "Port already in use" error
If you get an error that port 3004 is already in use:
- Check if the server is already running in another terminal
- Or change the port number in `server.js` (line 8: `app.listen(3004)`)

### "Cannot find module 'express'"
This means the dependencies aren't installed. Run `npm install` first.

## Next Steps

Once you're familiar with the basics, you can:
- Add more routes (endpoints) to handle different requests
- Connect to a database
- Add middleware for authentication, logging, etc.
- Handle POST, PUT, DELETE requests (currently only has GET)

## File Structure

```
backend/
├── server.js       # Main server file
├── package.json    # Project configuration and dependencies
└── node_modules/   # Installed packages (created after npm install)
```
