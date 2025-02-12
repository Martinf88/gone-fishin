import { db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export const fetchUser = async (user: User) => {
    try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Firestore user found: ", data);
            return { uid: user.uid, ...data };
        } else {
            console.warn("No Firestore user doc found! Using auth data.");
            return user;
        }
    } catch (error) {
        console.error("Error fetching firestore user data: ", error);
        return user;
    }
};
