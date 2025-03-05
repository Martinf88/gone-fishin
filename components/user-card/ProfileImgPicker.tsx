import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { useAuthStore } from "@/store/useStore";
import UsersService from "@/services/users";
import { useImagePicker } from "@/hooks/useImagePicker";

const ProfileImgPicker = () => {
    const { firestoreUser, setFirestoreUser, localProfileImgUri } =
        useAuthStore((state) => state);
    const [isUploading, setIsUploading] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);

    const { selectedImage, pickImage, clearImage } = useImagePicker("profile");

    useEffect(() => {
        if (localProfileImgUri) {
            setOverlayVisible(true);
        }
    }, [localProfileImgUri]);

    const handleUpload = async () => {
        if (!firestoreUser?.uid || !localProfileImgUri) return;

        setIsUploading(true);

        try {
            const newImageUrl = await UsersService.uploadProfileImgToFirestore(
                firestoreUser.uid,
                localProfileImgUri
            );

            if (newImageUrl) {
                setFirestoreUser({ ...firestoreUser, imageUrl: newImageUrl });
                clearImage();
                setOverlayVisible(false);
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Profile Image Display */}
            <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                {selectedImage ? (
                    <Image
                        style={styles.image}
                        source={{ uri: selectedImage }}
                    />
                ) : (
                    <Ionicons
                        name="camera-outline"
                        size={80}
                        color={COLORS.white}
                    />
                )}
            </TouchableOpacity>

            {/* Overlay - Covers Image Exactly */}
            {isOverlayVisible && localProfileImgUri && (
                <View style={styles.overlay}>
                    <TouchableOpacity
                        onPress={() => {
                            clearImage();
                            setOverlayVisible(false);
                        }}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelText}>Avbryt</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        onPress={handleUpload}
                        style={styles.confirmButton}
                    >
                        <Text style={styles.buttonText}>Bekräfta</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ProfileImgPicker;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageWrapper: {
        width: 150,
        height: 150,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 999,
    },
    overlay: {
        position: "absolute",
        width: 150,
        height: 150,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
    },
    confirmButton: {
        paddingVertical: 12,
        width: "100%",
        alignItems: "center",
    },
    cancelButton: {
        paddingVertical: 12,
        width: "100%",
        alignItems: "center",
    },
    divider: {
        width: "90%",
        height: 1,
        backgroundColor: COLORS.white,
        marginVertical: 5,
    },
    buttonText: {
        color: COLORS.white,
        // fontWeight: "bold",
        fontSize: 18,
    },
    cancelText: {
        color: COLORS.white,
        fontSize: 16,
    },
});
