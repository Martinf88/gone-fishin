import { Catch } from "@/types/types";
import { auth, db } from "@/firebaseConfig";
import {
    collection,
    getDocs,
    orderBy,
    onSnapshot,
    query,
    limit,
    startAfter,
    DocumentSnapshot,
    where,
    addDoc,
} from "firebase/firestore";
import { uploadToCloudinary } from "./uploadToCloudinary";
import { useAuthStore } from "@/store/useStore";
import { Alert } from "react-native";
const PAGE_SIZE = 10;
const catchesRef = collection(db, "catches");

const CatchesService = {
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
            console.log("✅ Catches fetched:", userCatches);

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

        const { localImageUri } = useAuthStore.getState();

        console.log("📸 localImageUri before upload:", localImageUri);
        try {
            let imageUrl = null;

            if (localImageUri) {
                console.log("📤 Calling uploadToCloudinary...");
                imageUrl = await uploadToCloudinary(localImageUri);
                console.log("✅ Image uploaded successfully:", imageUrl);
                Alert.alert("Success", "Image uploaded to Cloudinary!");
            }
            await addDoc(collection(db, "catches"), {
                userId: user.uid,
                ...catchData,
                imageUrl,
                createdAt: new Date(),
            });
            console.log("Catch registered successfully");
        } catch (error) {
            console.error("Error registering catch:", error);
        }
    },
};

export default CatchesService;
