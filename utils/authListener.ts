import { useRouter, usePathname } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUser } from "@/services/firestore";

export const useAuthListener = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = fetchUser(user);
                setUser(userData);

                if (pathname !== "/feed") {
                    router.replace("/feed");
                }
            } else {
                setUser(null);
                router.replace("/");
            }
        });

        return () => {
            console.log("Cleaning up auth listener.");
            unsubscribe();
        };
    }, [setUser]);
};
