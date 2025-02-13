import { db } from "@/firebaseConfig";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    Timestamp,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { Catch, User } from "@/types/types";
//TODO: implementera lazy loading av catches

export const fetchUser = async (user: FirebaseUser): Promise<User | null> => {
    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data: ", docSnap.data);
        } else {
            console.log("No such document exist!");
        }

        const userData = docSnap.data() as User;

        return userData;
    } catch (error) {
        console.error("Error fetching user: ", error);
        return null;
    }
};

export const fetchCatchesByUser = async (userId: string): Promise<Catch[]> => {
    try {
        const catchesRef = collection(db, "catches");
        const q = query(catchesRef, where("userId", "==", userId));
        const querySnapShot = await getDocs(q);

        return querySnapShot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Catch, "id">),
        }));
    } catch (error) {
        console.error("Error fetching catches: ", error);
        return [];
    }
};
