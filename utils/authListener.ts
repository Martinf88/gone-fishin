import { useRouter, usePathname } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "@/services/firestore";

export const useAuthListener = () => {
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
    const setFirestoreUser = useAuthStore((state) => state.setFirestoreUser);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            console.log("🟡 Auth State Changed: ", authUser);
            if (authUser) {
                setAuthUser(authUser);

                const firestoreUser = await fetchUser(authUser);
                console.log("User data: ", firestoreUser);

                setFirestoreUser(firestoreUser);

                if (pathname !== "/feed") {
                    router.replace("/feed");
                }
            } else {
                console.log("🔴 No user found, resetting state");
                setAuthUser(null);
                setFirestoreUser(null);
                router.replace("/");
            }
        });

        return () => {
            console.log("Cleaning up auth listener.");
            unsubscribe();
        };
    }, []);
};
