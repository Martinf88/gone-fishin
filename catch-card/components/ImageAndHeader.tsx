import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Catch } from "@/types/types";
import { COLORS } from "@/constants/Colors";
import { getTimeSinceUpload } from "@/helper-functions/getTimeSinceUpload";
import { useGetUserName } from "@/hooks/getUsername";
import { useAuthStore } from "@/store/useStore";
import Profile from "@/app/(tabs)/profile";

interface ImageAndHeaderProps {
    catchData: Catch;
    onPress: () => void;
}

const ImageAndHeader = ({ catchData, onPress }: ImageAndHeaderProps) => {
    const { firestoreUser } = useAuthStore((state) => state);
    // const username = useGetUserName(catchData.userId);
    return (
        <View style={styles.ImageAndHeader}>
            <Image source={{ uri: catchData.imageUrl }} style={styles.image} />

            {/* Overlay Header */}
            <View style={styles.overlay}>
                <View style={styles.overlayDetails}>
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
                    <View>
                        <Text style={styles.largeText}>
                            {catchData.user.username}
                        </Text>
                        <Text style={styles.smallText}>
                            {getTimeSinceUpload(catchData.createdAt)} -{" "}
                            {catchData.speciesName}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                    <Text style={styles.largeText}>Visa detaljer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ImageAndHeader;

const styles = StyleSheet.create({
    ImageAndHeader: {
        width: "100%",
        height: 400,
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
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
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        padding: 10,
    },
    overlayDetails: {
        flexDirection: "row",
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
