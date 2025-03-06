import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import CatchesService from "@/services/catches";
import { Catch } from "@/types/types";
import { useAuthStore } from "@/store/useStore";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useGetUserName } from "@/hooks/getUsername";

//TODO: show username for the users who have liked a catch

interface SocialContainerProps {
    catchData: Catch;
}

type Like = {
    userId: string;
    username: string;
};

const SocialContainer = ({ catchData }: SocialContainerProps) => {
    const { firestoreUser } = useAuthStore((state) => state);
    const [likes, setLikes] = useState<Like[]>(catchData.likes);
    const [userName, setUsername] = useState();

    useEffect(() => {
        const catchRef = doc(db, "catches", catchData.catchId);
        const unsubscribe = onSnapshot(catchRef, (docSnap) => {
            if (docSnap.exists()) {
                const updatedCatch = docSnap.data() as Catch;
                setLikes(updatedCatch.likes || []);
            }
        });

        return () => unsubscribe();
    }, [catchData.catchId]);

    const handleAddLike = async () => {
        // call update function
        if (!catchData.catchId || !firestoreUser) {
            console.log("Failed to add like");
            return;
        }
        const username = await useGetUserName(firestoreUser.uid);

        if (!username) {
            console.log("Username not found");
            return;
        }

        CatchesService.updateCatchLike(catchData.catchId, {
            userId: firestoreUser.uid,
            username,
        });
    };

    return (
        <View style={styles.socialContainer}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleAddLike}>
                    <Feather name="thumbs-up" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.largeText}>{likes.length} likes</Text>
                {likes.map((like) => {
                    return (
                        <Text key={like.userId} style={styles.smallText}>
                            {like.username}
                        </Text>
                    );
                })}
            </View>
            {/* TODO: Add comments <TouchableOpacity>
                <FontAwesome
                    name="commenting-o"
                    size={24}
                    color={COLORS.white}
                />
            </TouchableOpacity> */}
        </View>
    );
};

export default SocialContainer;

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: "row",
        padding: 10,
    },
    wrapper: {
        flexDirection: "row",
        marginLeft: 5,
        gap: 10,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
});
