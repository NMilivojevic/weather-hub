// authService.js

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";

export function subscribeToAuthState(
    onNext: (user: User | null) => void,
    onError?: (error: Error) => void
) {
    const unsubscribe = onAuthStateChanged(auth, onNext, onError);
    return unsubscribe;
}

// Other authentication-related functions (e.g., signIn, signOut, signUp) can go here.
