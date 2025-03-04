import { db } from "@/firebaseConfig";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { User } from "@/types/types";
import CloudinaryService from "./uploadToCloudinary";

const UsersService = {
    //USERS
    async fetchLoggedInUser(userId: string): Promise<User | null> {
        try {
            console.log("fetching firestore user");

            if (!userId) {
                console.warn("⚠️ No userId provided.");
                return null;
            }

            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                console.warn("⚠️ No user found in Firestore.");
                return null;
            }

            const userData = docSnap.data();

            if (!userData?.userName || !userData?.email) {
                console.warn("⚠️ User data is incomplete in Firestore.");
                return null;
            }

            return { uid: userId, ...userData } as User;
        } catch (error) {
            console.error("❌ Error fetching user:", error);
            return null;
        }
    },
    async fetchAllUsers(): Promise<User[]> {
        try {
            console.log("📡 Fetching all users from Firestore...");

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
    },

    async uploadProfileImgToFirestore(
        userId: string,
        localProfileImgUri: string
    ): Promise<string | null> {
        if (!userId) {
            console.warn("⚠️ No userId provided.");
            return null;
        }

        try {
            console.log("🚀 Starting upload of profile image...");

            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            const existingImageUrl = userSnap.exists()
                ? userSnap.data()?.imageUrl
                : null;

            if (existingImageUrl === localProfileImgUri) {
                console.log("✅ Image is already up-to-date. Skipping upload.");
                return existingImageUrl;
            }

            // 🔹 Upload to Cloudinary
            const newImageUrl =
                await CloudinaryService.uploadProfileImgToCloudinary(
                    localProfileImgUri
                );

            if (!newImageUrl) {
                console.log("❌ No new image URL received.");
                return null;
            }

            // 🔹 Update Firestore with new image URL
            await updateDoc(userRef, { imageUrl: newImageUrl });

            console.log(
                "✅ Profile image successfully uploaded and saved to Firestore."
            );
            return newImageUrl;
        } catch (error) {
            console.error("🔥 Error uploading profile image:", error);
            return null;
        }
    },
};

export default UsersService;
