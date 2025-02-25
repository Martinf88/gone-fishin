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
const PAGE_SIZE = 10;
const catchesRef = collection(db, "catches");

const CatchesService = {
    async fetchCatchesLazy(lastDoc: DocumentSnapshot | null = null): Promise<{
        catches: Catch[];
        lastDoc: DocumentSnapshot | null;
        hasMore: boolean;
    }> {
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

    subscribeToUpdates(callback: (newCatches: Catch[]) => void): () => void {
        const q = query(
            catchesRef,
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE)
        );

        return onSnapshot(q, (snapshot) => {
            const newCatches: Catch[] = snapshot
                .docChanges()
                .filter((change) => change.type === "added")
                .map((change) => ({
                    catchId: change.doc.id,
                    ...(change.doc.data() as Omit<Catch, "catchId">),
                }));

            if (newCatches.length > 0) {
                callback(newCatches);
            }
        });
    },

    async handleRegisterCatch({ ...catchData }) {
        const user = auth.currentUser;
        if (!user) {
            console.error("No user signed in");
            return;
        }
        try {
            // 1. Create catch document in Firestore
            await addDoc(collection(db, "catches"), {
                userId: user.uid,
                ...catchData,
                createdAt: new Date(),
            });
            console.log("Catch registered successfully");
        } catch (error) {
            console.error("Error registering catch:", error);
        }
    },
};

export default CatchesService;
