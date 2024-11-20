# Tournament Management Platform

## Project Overview

This project is a tournament management platform designed to create tournaments, link teams, and add points to respective teams. The goal is to automatically generate charts based on the data, offering a clear and dynamic view of team standings and performance throughout the tournament.

## Features

- **Create Tournaments**: Easily set up new tournaments with custom rules and details.
- **Team Management**: Link teams to tournaments and manage their details.
- **Point System**: Add and update points for each team, automatically reflecting on the tournament charts.
- **Chart Visualization**: Dynamic charts that provide a clear view of the tournament standings and scores.

## Tech Stack

- **Next.js**: A React framework for building server-side rendered applications.
- **ShadCN UI**: A customizable component library to streamline the UI development process.
- **Firebase Firestore**: A NoSQL cloud database for storing tournament and team data in real-time.

## Installation & Setup

### Prerequisites

- **Node.js**: Make sure you have Node.js installed (v16 or higher).
- **Firebase Account**: You'll need a Firebase project with Firestore set up.

### Steps to Set Up Locally

1. **Clone the Repository**:
    ```bash
    git clone git@github.com:LisaGHeclys/Tournament-Pool.git
    cd Tournament-Pool
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Firebase**:
    - Go to the Firebase console, create a new project, and set up Firestore.
    - Copy your Firebase credentials (API Key, Project ID, etc.) into a `.env.local` file at the root of the project:
    ```plaintext
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    ```

4. **Run the Development Server**:
    ```bash
    npm run dev
    ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### How to Build for Production

To build the application for production, run:
```bash
npm run build
```

## Contribution Guidelines

Feel free to improve this project by developing ([contribution guide](CONTRIBUTING.md)) or participating in [community discussions](https://github.com/LisaGHeclys/Tournament-Pool/discussions).

### Contribution Best Practices

- **Code Style**: Ensure your code follows the project’s coding conventions.
- **Documentation**: For new features or changes, update the README or other relevant documentation.

### Issue Tracking & Support

If you encounter any issues or have questions, here’s how you can reach out:

1. **Submit an Issue**: If you find a bug or want to request a new feature, please submit an issue via the [Tournament-Pool Issues Page](https://github.com/LisaGHeclys/Tournament-Pool/issues).
    - Be sure to provide as much context as possible (steps to reproduce, screenshots, etc.).

2. **Message Me**: If you need direct support or want to discuss the project, you can reach me by:
    - Opening a GitHub Discussion.
    - Sending me a message via [my GitHub profile](https://github.com/LisaGHeclys).

I’ll get back to you as soon as possible. Your feedback and questions are always welcome!
