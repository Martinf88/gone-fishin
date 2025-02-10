import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;
        console.log("User signed in: ", user.email);

        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem("user", jsonValue);

        router.replace("/feed");
    } catch (error) {
        console.error(error);
    }
};

export const handleSignOut = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");

        router.replace("/sign-in");
    } catch (error) {
        console.error(error);
    }
};
