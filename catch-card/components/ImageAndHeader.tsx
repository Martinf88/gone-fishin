import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Catch } from "@/types/types";
import { COLORS } from "@/constants/Colors";
import { getTimeSinceUpload } from "@/helper-functions/getTimeSinceUpload";
import { useAuthStore } from "@/store/useStore";

interface ImageAndHeaderProps {
    catchData: Catch;
    onPress: () => void;
    showDetails: boolean;
}

const ImageAndHeader = ({ catchData }: ImageAndHeaderProps) => {
    const { firestoreUser } = useAuthStore((state) => state);

    return (
        <View style={styles.ImageAndHeader}>
            <Image source={{ uri: catchData.imageUrl }} style={styles.image} />

            <View style={styles.overlay}>
                {/* Left Section: Image and User Info */}
                <View style={styles.leftSection}>
                    <View style={styles.ProfileImageWrapper}>
                        {firestoreUser?.imageUrl ? (
                            <Image
                                source={{ uri: firestoreUser.imageUrl }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Ionicons
                                name="person-circle-outline"
                                size={48}
                                color={COLORS.white}
                            />
                        )}
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.largeText}>
                            {catchData.user.username}
                        </Text>
                        <Text style={styles.smallText}>
                            {getTimeSinceUpload(catchData.createdAt)} -{" "}
                            {catchData.speciesName}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ImageAndHeader;

const styles = StyleSheet.create({
    ImageAndHeader: {
        width: "100%",
        height: 400,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    ProfileImageWrapper: {
        width: 50,
        height: 50,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 999,
    },
    userInfo: {
        flexDirection: "column",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.white,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.white,
    },
});
