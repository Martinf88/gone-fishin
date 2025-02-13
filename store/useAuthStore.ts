import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Catch, User as FirestoreUser } from "@/types/types";
import { User as FirebaseUser } from "firebase/auth";

interface AuthStore {
    authUser: FirebaseUser | null;
    firestoreUser: FirestoreUser | null;
    setAuthUser: (user: FirebaseUser | null) => void;
    setFirestoreUser: (user: FirestoreUser | null) => void;
    catches: Catch[];
    setCatches: (catches: Catch[]) => void;
    addCatch: (newCatch: Catch) => void;
    isLoading: boolean;
    // signOutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            authUser: null,
            firestoreUser: null,
            catches: [],

            isLoading: true,

            setAuthUser: (user) => set({ authUser: user }),
            setFirestoreUser: (user) => set({ firestoreUser: user }),
            setCatches: (catches) => set({ catches }),
            addCatch: (newCatch) =>
                set((state) => ({
                    catches: [...state.catches, newCatch],
                })),

            // signOutUser: async () => {
            //     await signOut(auth);
            //     set({ user: null });
            // },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
