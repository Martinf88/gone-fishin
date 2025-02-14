import { db } from "@/firebaseConfig";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { Catch, User } from "@/types/types";
//TODO: implementera lazy loading av catches

export const fetchUser = async (user: FirebaseUser): Promise<User | null> => {
    try {
        if (!user?.uid) {
            console.warn("⚠️ fetchUser called with invalid user:", user);
            return null;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn("⚠️ No Firestore user found for:", user.uid);
            return null;
        }

        // ✅ Extract Firestore user data
        const userData = docSnap.data();

        // ✅ Ensure we have required fields, fallback if necessary
        if (!userData || !userData.userName || !userData.email) {
            console.warn("⚠️ Incomplete user data:", userData);
            return null;
        }

        // ✅ Ensure `uid` is always included
        return { uid: user.uid, ...userData } as User;
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return null;
    }
};

export const fetchCatchesByUser = async (userId?: string): Promise<Catch[]> => {
    try {
        if (!userId) {
            console.error(
                "🚨 Error: userId is undefined in fetchCatchesByUser"
            );
            return [];
        }

        console.log("📢 Fetching catches for user:", userId);

        const catchesRef = collection(db, "catches");
        const q = query(catchesRef, where("userId", "==", userId));

        const querySnapshot = await getDocs(q);

        const catches = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                catchId: doc.id,
                ...(data as Omit<Catch, "catchId">),
            };
        });

        console.log("✅ Catches fetched:", catches);
        return catches;
    } catch (error) {
        console.error("🚨 Error fetching catches:", error);
        return [];
    }
};
