import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

const getFirebaseConfig = () => {
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      config: {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      },
      dbId: import.meta.env.VITE_FIREBASE_DATABASE_ID
    };
  }
  
  const configs = import.meta.glob('../../firebase-applet-config.json', { eager: true });
  const configModule = configs['../../firebase-applet-config.json'] as any;
  
  if (configModule) {
    const config = configModule.default || configModule;
    return {
      config: {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
      },
      dbId: config.firestoreDatabaseId
    };
  }

  console.warn("Firebase config not found. Please set VITE_FIREBASE_API_KEY or provide firebase-applet-config.json");
  return { config: {}, dbId: undefined };
};

const { config: firebaseConfig, dbId } = getFirebaseConfig();

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, dbId);

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
