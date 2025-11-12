# Framez - Social Media App

A mobile social media app built with Expo and Convex backend.

## Features

- User authentication (sign-up, login, logout)
- Create and share posts with text and/or images
- View feed of all posts (most recent first)
- User profile with avatar, info, and personal posts
- Real-time data sync

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from example:
```bash
cp .env.example .env.local
```

3. Set up Convex (choose one):

**For local development:**
```bash
npx convex dev
```
This will create a local Convex deployment and update `.env.local` automatically.

**For cloud deployment:**
```bash
npx convex deploy --yes
```
Then update `.env.local` with the cloud URL shown in the terminal.

4. Start the app:
```bash
npx expo start
```

## Tech Stack

- Expo / React Native
- Convex (Backend & Real-time Database)
- TypeScript
- Expo Router (Navigation)
