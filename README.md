# Framez - Social Media App

A mobile social media app built with Expo and Convex backend.

## Features

- User authentication (sign-up, login, logout)
- Create and share posts
- View feed of all posts
- User profile with personal posts

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up Convex:
```bash
npx convex dev
```

3. Copy the Convex URL from the terminal and add it to `.env.local`:
```
EXPO_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
```

4. Start the app:
```bash
npx expo start
```

## Tech Stack

- Expo / React Native
- Convex (Backend & Real-time Database)
- TypeScript
- Expo Router (Navigation)
