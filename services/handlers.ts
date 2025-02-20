import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    deleteUser,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useStore";

//TODO: Move file logic to use AuthStore

interface SignInProps {
    email: string;
    password: string;
    setIsLoading: (value: boolean) => void;
}
interface SignUpProps {
    email: string;
    password: string;
    setIsLoading: (value: boolean) => void;
    userName: string;
}

export const handleSignIn = async ({
    email,
    password,
    setIsLoading,
}: SignInProps) => {
    setIsLoading(true);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Navigate user to the feed
        router.replace("/feed");
    } catch (error) {
        console.error("Error signing in user:", error);
    } finally {
        setIsLoading(false);
    }
};

export const handleSignOut = async () => {
    try {
        console.log("Signing out user...");

        await signOut(auth);
        useAuthStore.getState().setFirestoreUser(null);

        console.log("User signed out successfully");
        console.log("After sign-out:", useAuthStore.getState().firestoreUser);
        router.replace("/sign-in");
    } catch (error) {
        console.error("Error siging out user", error);
    }
};

export const handleSignUp = async ({
    email,
    password,
    setIsLoading,
    userName,
}: SignUpProps) => {
    setIsLoading(true);
    try {
        // 1. Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log("User signed up: ", user.uid);

        // 2. Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
            userName: userName,
            badges: [],
            imageUrl: "",
            createdAt: new Date(),
            email: email,
        });
        console.log("User document created successfully: ", user.uid);

        // 3. Navigate to the feed page
        router.replace("/feed");
    } catch (error) {
        console.error("Error creating new user:", error);

        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
            console.log("Deleted orphaned user due to Firestore error");
        }
    } finally {
        setIsLoading(false);
    }
};

export const handleRegisterCatch = async ({ ...catchData }) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user signed in");
        return;
    }
    try {
        // 1. Create catch document in Firestore
        await setDoc(doc(db, "catches", user.uid), {
            ...catchData,
            createdAt: new Date(),
        });
        console.log("Catch registered successfully");
    } catch (error) {
        console.error("Error registering catch:", error);
    }
};
