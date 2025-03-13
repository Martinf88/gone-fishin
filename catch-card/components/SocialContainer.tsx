import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import CatchesService from "@/services/catches";
import { Catch, Like } from "@/types/types";
import { useAuthStore } from "@/store/useStore";
import { db } from "@/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import CustomButton from "@/components/common/CustomButton";

//TODO: show username for the users who have liked a catch

interface SocialContainerProps {
    catchData: Catch;
}

const SocialContainer = ({ catchData }: SocialContainerProps) => {
    const { firestoreUser } = useAuthStore((state) => state);
    const [likes, setLikes] = useState<Like[]>(catchData.likes);
    const [showLikesDetails, setShowLikesDetails] = useState(false);

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

        CatchesService.updateCatchLike(catchData.catchId, {
            userId: firestoreUser.uid,
            username: firestoreUser.userName,
        });
    };

    return (
        <View style={styles.socialContainer}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleAddLike}>
                    <Feather
                        name="thumbs-up"
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setShowLikesDetails(!showLikesDetails)}
                >
                    <Text style={styles.largeText}>{likes.length} likes</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showLikesDetails}
                    onRequestClose={() =>
                        setShowLikesDetails(!showLikesDetails)
                    }
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>
                                Folk som gillar
                            </Text>
                            <FlatList
                                data={likes}
                                renderItem={({ item }) => (
                                    <View style={styles.itemwrapper}>
                                        <Text style={styles.modalText}>
                                            {item.username}
                                        </Text>
                                        <Pressable style={styles.buttonFollow}>
                                            <Text
                                                style={styles.textButtonFollow}
                                            >
                                                Följ
                                            </Text>
                                        </Pressable>
                                    </View>
                                )}
                                keyExtractor={(item) => item.userId}
                            />
                            <CustomButton
                                handlePress={() =>
                                    setShowLikesDetails(!showLikesDetails)
                                }
                                title="Stäng"
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

export default SocialContainer;

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: COLORS.action,
        // borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 20,
    },
    wrapper: {
        flexDirection: "row",
        marginLeft: 5,
        gap: 10,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "Kurale-Regular",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.primary,
        fontFamily: "Kurale-Regular",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: COLORS.primary,
        width: "100%",
        height: "100%",
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    itemwrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonFollow: {
        backgroundColor: COLORS.white,
        color: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
    },
    textButtonFollow: {
        color: COLORS.black,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textButtonClose: {
        color: COLORS.white,
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: COLORS.white,
        marginBottom: 5,
    },
});
