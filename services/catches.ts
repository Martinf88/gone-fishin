import { Catch } from "@/types/types";
import { auth, db } from "@/firebaseConfig";
import {
    collection,
    getDocs,
    orderBy,
    query,
    limit,
    startAfter,
    DocumentSnapshot,
    where,
    addDoc,
    doc,
    updateDoc,
    increment,
    getDoc,
} from "firebase/firestore";
import CloudinaryService from "./uploadToCloudinary";
import { useAuthStore } from "@/store/useStore";
import { Alert } from "react-native";
const PAGE_SIZE = 10;
const catchesRef = collection(db, "catches");

const CatchesService = {
    async fetchTotalCatches(userId: string) {
        try {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data().totalCatches || 0;
            }
            return 0;
        } catch (error) {
            console.error("🚨 Error fetching total catches:", error);
            return 0;
        }
    },

    async fetchCatchesLazy(lastDoc: DocumentSnapshot | null = null): Promise<{
        catches: Catch[];
        lastDoc: DocumentSnapshot | null;
        hasMore: boolean;
    }> {
        console.log("FetchCatchesLzy");

        try {
            let q = query(
                catchesRef,
                orderBy("createdAt", "desc"),
                limit(PAGE_SIZE)
            );

            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }

            const querySnap = await getDocs(q);

            const catches: Catch[] = querySnap.docs.map((doc) => {
                const data = doc.data();
                return {
                    catchId: doc.id,
                    ...(data as Omit<Catch, "catchId">),
                };
            });
            return {
                catches,
                lastDoc:
                    querySnap.docs.length > 0
                        ? querySnap.docs[querySnap.docs.length - 1]
                        : null,
                hasMore: querySnap.docs.length === PAGE_SIZE,
            };
        } catch (error) {
            console.error("🚨 Error fetching catches:", error);
            return { catches: [], lastDoc: null, hasMore: false };
        }
    },

    async fetchCatchesWithUidLazy(
        userId: string,
        lastDoc: DocumentSnapshot | null = null
    ): Promise<{
        userCatches: Catch[];
        lastDoc: DocumentSnapshot | null;
        hasMore: boolean;
    }> {
        try {
            console.log("📢 Fetching catches for user lazy:", userId);

            let q = query(
                catchesRef,
                where("userId", "==", userId),
                orderBy("createdAt", "desc"),
                limit(PAGE_SIZE)
            );

            if (lastDoc) {
                q = query(q, startAfter(lastDoc));
            }
            const querySnap = await getDocs(q);

            const userCatches: Catch[] = querySnap.docs.map((doc) => ({
                catchId: doc.id,
                ...(doc.data() as Omit<Catch, "catchId">),
            }));

            return {
                userCatches,
                lastDoc:
                    querySnap.docs.length > 0
                        ? querySnap.docs[querySnap.docs.length - 1]
                        : null,
                hasMore: querySnap.docs.length === PAGE_SIZE,
            };
        } catch (error) {
            console.error("🚨 Error fetching userCatchesLazy:", error);
            return {
                userCatches: [],
                lastDoc: null,
                hasMore: false,
            };
        }
    },

    async handleRegisterCatch({ ...catchData }) {
        console.log("handleRegisterCatch is being called!");

        const user = auth.currentUser;
        if (!user) {
            console.error("No user signed in");
            return;
        }

        const { localFormImageUri } = useAuthStore.getState();

        console.log("📸 localFormImageUri before upload:", localFormImageUri);
        try {
            let imageUrl = null;

            if (localFormImageUri) {
                console.log("📤 Calling uploadToCloudinary...");
                imageUrl =
                    await CloudinaryService.uploadCatchesImageToCloudinary(
                        localFormImageUri
                    );
                console.log("✅ Image uploaded successfully:", imageUrl);
            }
            await addDoc(collection(db, "catches"), {
                userId: user.uid,
                ...catchData,
                imageUrl,
                createdAt: new Date(),
            });
            console.log("Catch registered successfully");
            Alert.alert("Succe!", "Din fångst är upplad!");

            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                totalCatches: increment(1),
            });
            console.log("✅ Updated totalCatches for user:", user.uid);
        } catch (error) {
            console.error("Error registering catch:", error);
        }
    },
};

export default CatchesService;
