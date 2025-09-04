import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCrPI2AVBCqhhEN5bR0qRUjNnlGYkaVujY",
  authDomain: "barber-finder-ai-agent.firebaseapp.com",
  projectId: "barber-finder-ai-agent",
  storageBucket: "barber-finder-ai-agent.firebasestorage.app",
  messagingSenderId: "984041216368",
  appId: "1:984041216368:web:f4fafece7c7c052bc3d7b5",
  measurementId: "G-FW6HDDBQCD"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
