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

export const fetchLoggedInUser = async (
    user: FirebaseUser
): Promise<User | null> => {
    try {
        if (!user?.uid) return null;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        const userData = docSnap.data();

        if (userData?.userName && userData?.email) {
            return { uid: user.uid, ...userData } as User;
        }
        return null;
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return null;
    }
};

export const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const usersRef = collection(db, "users");
        const docSnap = await getDocs(usersRef);

        return docSnap.docs.map((doc) => ({
            uid: doc.id,
            ...(doc.data() as Omit<User, "uid">),
        }));
    } catch (error) {
        console.error("❌ Error fetching users:", error);
        return [];
    }
};

export const fetchCatches = async (userId?: string): Promise<Catch[]> => {
    try {
        if (!userId) {
            const catchesRef = collection(db, "catches");
            const docSnap = await getDocs(catchesRef);
            const allCatches = docSnap.docs.map((doc) => {
                const data = doc.data();
                return {
                    catchId: doc.id,
                    ...(data as Omit<Catch, "catchId">),
                };
            });
            return allCatches;
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
