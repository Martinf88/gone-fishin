import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Catch, User as FirestoreUser } from "@/types/types";
import { User as FirebaseUser } from "firebase/auth";
import UsersService from "@/services/users";
import { Timestamp } from "firebase/firestore";

// const [localProfileUri, setLocalProfileUri] = useState<string | null>(null);

export interface CatchForm {
    speciesName: string;
    length: number | null;
    weight: number | null;
    method: string;
    bait: string;
    description: string;
    location: {
        latitude: number | null;
        longitude: number | null;
    };
    imageUrl: string | null;
    date: Timestamp | null;
    time: Timestamp | null;
}

interface StoreState {
    authUser: FirebaseUser | null;
    firestoreUser: FirestoreUser | null;
    allUsers: FirestoreUser[];
    profileCatches: Catch[];
    feedCatches: Catch[];

    catchForm: CatchForm;
    localFormImageUri: string | null;

    localProfileImgUri: string | null;

    resetCatchForm: () => void;
    setLocalFormImageUri: (uri: string | null) => void;
    setLocalProfileImgUri: (uri: string | null) => void;
    updateCatchField: (field: keyof CatchForm, value: any) => void;
    setCatchLocation: (latitude: number, longitude: number) => void;
    setAuthUser: (user: FirebaseUser | null) => void;
    setFirestoreUser: (user: FirestoreUser | null) => void;

    fetchAllUsers: () => Promise<void>;
}

export const useAuthStore = create<StoreState>()(
    persist(
        (set, get) => ({
            authUser: null,
            firestoreUser: null,
            allUsers: [],
            profileCatches: [],
            feedCatches: [],

            catchForm: {
                speciesName: "",
                length: null,
                weight: null,
                method: "",
                bait: "",
                description: "",
                location: {
                    latitude: null,
                    longitude: null,
                },
                imageUrl: null,
                date: null,
                time: null,
            },
            localFormImageUri: null,

            localProfileImgUri: null,

            resetCatchForm: () =>
                set({
                    catchForm: {
                        speciesName: "",
                        length: null,
                        weight: null,
                        method: "",
                        bait: "",
                        description: "",
                        location: {
                            latitude: null,
                            longitude: null,
                        },
                        imageUrl: null,
                        date: null,
                        time: null,
                    },
                    localFormImageUri: null,
                }),

            setLocalFormImageUri: (uri: string | null) =>
                set(() => ({
                    localFormImageUri: uri,
                })),

            setLocalProfileImgUri: (uri: string | null) =>
                set(() => ({
                    localProfileImgUri: uri,
                })),

            updateCatchField: (field: keyof CatchForm, value: any) =>
                set((state) => ({
                    catchForm: {
                        ...state.catchForm,
                        [field]: value,
                    },
                })),

            setCatchLocation: (latitude: number, longitude: number) =>
                set((state) => ({
                    catchForm: {
                        ...state.catchForm,
                        location: { latitude, longitude },
                    },
                })),

            setAuthUser: (user) => set({ authUser: user }),
            setFirestoreUser: (user) => set({ firestoreUser: user }),
            fetchAllUsers: async () => {
                const allUsers = await UsersService.fetchAllUsers();
                set({ allUsers });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ firestoreUser: state.firestoreUser }),
        }
    )
);
