import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Catch, User as FirestoreUser } from "@/types/types";
import { User as FirebaseUser } from "firebase/auth";
import { fetchAllUsers, fetchCatches } from "@/services/firestore";

interface AuthStore {
    authUser: FirebaseUser | null;
    firestoreUser: FirestoreUser | null;
    allUsers: FirestoreUser[];
    profileCatches: Catch[];
    feedCatches: Catch[];
    totalCatches: number;
    uniqueSpeciesCount: number;

    setAuthUser: (user: FirebaseUser | null) => void;
    setFirestoreUser: (user: FirestoreUser | null) => void;
    fetchUserCatches: () => Promise<void>;
    fetchAllCatches: () => Promise<void>;
    fetchAllUsers: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            authUser: null,
            firestoreUser: null,
            allUsers: [],
            profileCatches: [],
            feedCatches: [],
            totalCatches: 0,
            uniqueSpeciesCount: 0,

            setAuthUser: (user) => set({ authUser: user }),
            setFirestoreUser: (user) => set({ firestoreUser: user }),
            fetchAllUsers: async () => {
                const allUsers = await fetchAllUsers();
                set({ allUsers });
            },
            fetchAllCatches: async () => {
                const allCatches = await fetchCatches();
                set({ feedCatches: allCatches });
            },
            fetchUserCatches: async () => {
                const userId = get().firestoreUser?.uid;
                if (!userId) return;

                const profileCatches = await fetchCatches(userId);
                const totalCatches = profileCatches.length;
                const uniqueSpeciesSet = new Set(
                    profileCatches.map((c) => c.speciesName)
                );
                const uniqueSpeciesCount = uniqueSpeciesSet.size;

                set({ profileCatches, totalCatches, uniqueSpeciesCount });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ firestoreUser: state.firestoreUser }),
        }
    )
);
