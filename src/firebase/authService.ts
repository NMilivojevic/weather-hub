// authService.js

import { onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { auth } from "./firebase";

export const subscribeToAuthState = (
    onNext: (user: User | null) => void,
    onError?: (error: Error) => void
): Unsubscribe => {
    const unsubscribe = onAuthStateChanged(auth, onNext, onError);
    return unsubscribe;
};
