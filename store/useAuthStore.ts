import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
    user: any | null;
    isLoading: boolean;
    setUser: (user: any | null) => void;
    signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,

            setUser: (user) => set({ user }),

            signOutUser: async () => {
                await signOut(auth);
                set({ user: null });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
