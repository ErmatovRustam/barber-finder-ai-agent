## Bay Area Barber Finder (AI Agent)

Single-page React app (Vite + TypeScript) to discover and book barbershops in the San Francisco Bay Area.

### Features

- **AI Agent Widget**: Geolocation-based barbershop finder
- **Authentication**: Firebase Auth with Google sign-in and email/password
- **Appointments**: Book and manage appointments (requires sign-in)
- **User Profile**: View appointments and manage payments
- **Theme Toggle**: Light/dark mode with persistence
- **Responsive Design**: Mobile-first responsive layout

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google + Email/Password)
3. Enable Firestore Database
4. Copy your config to `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}
```

### Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview production build

### Getting started

1. Install deps: `npm install`
2. Configure Firebase in `src/firebase/config.ts`
3. Run dev: `npm run dev`
4. Open the URL printed in terminal

### Project structure

- `src/App.tsx`: homepage sections and layout
- `src/components/AgentWidget.tsx`: AI geolocation widget
- `src/components/AuthButton.tsx`: Google sign-in/out
- `src/components/AppointmentForm.tsx`: appointment booking (auth required)
- `src/components/UserProfile.tsx`: user dashboard
- `src/contexts/AuthContext.tsx`: authentication state management
- `src/firebase/config.ts`: Firebase configuration
- `src/App.css`: global and responsive styles
- `src/main.tsx`: router and auth provider setup

### Notes

- Geolocation requires HTTPS or localhost
- Appointments require Firebase authentication
- User data stored in Firestore
- Theme preference saved in localStorage
