import { db } from "@/firebaseConfig";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { Catch, User } from "@/types/types";
//TODO: implementera lazy loading av catches

//USERS
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
