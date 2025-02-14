import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Catch, User as FirestoreUser } from "@/types/types";
import { User as FirebaseUser } from "firebase/auth";
import { fetchCatchesByUser } from "@/services/firestore";

interface AuthStore {
    authUser: FirebaseUser | null;
    firestoreUser: FirestoreUser | null;
    catches: Catch[];
    totalCatches: number;
    uniqueSpeciesCount: number;

    setAuthUser: (user: FirebaseUser | null) => void;
    setFirestoreUser: (user: FirestoreUser | null) => void;
    fetchUserCatches: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            authUser: null,
            firestoreUser: null,
            catches: [],
            totalCatches: 0,
            uniqueSpeciesCount: 0,

            setAuthUser: (user) => set({ authUser: user }),
            setFirestoreUser: (user) => set({ firestoreUser: user }),
            fetchUserCatches: async () => {
                const userId = get().firestoreUser?.uid;
                if (!userId) return;

                const catches = await fetchCatchesByUser(userId);
                const totalCatches = catches.length;
                const uniqueSpeciesSet = new Set(
                    catches.map((c) => c.speciesId)
                );
                const uniqueSpeciesCount = uniqueSpeciesSet.size;

                set({ catches, totalCatches, uniqueSpeciesCount });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ firestoreUser: state.firestoreUser }),
        }
    )
);
