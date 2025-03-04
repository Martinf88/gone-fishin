import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "@/constants/Colors";
import { useAuthStore } from "@/store/useStore";
import UsersService from "@/services/users";

//TODO: Create a user friendly experience when uploading a profilepic.
//Ideas: Open a modal to confirm or take the user to another page when clicking on the button
// OR add a confirmbutton ontop of the preview image. That could work as an overlay ontop of the image. Have a "bekräfta" and a "Avbryt" option

//TODO: Refresh user so that the profile image updates

const ProfileImgPicker = () => {
    const {
        localProfileImgUri,
        setLocalProfileImgUri,
        firestoreUser,
        setFirestoreUser,
    } = useAuthStore((state) => state);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (firestoreUser?.imageUrl) {
            setProfileImage(firestoreUser.imageUrl);
        }
    }, [firestoreUser]);

    const pickImage = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
                "Permission Required",
                "You need to allow access to your photos."
            );
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.6,
        });

        if (
            !result.canceled &&
            result.assets?.[0]?.uri !== localProfileImgUri
        ) {
            setLocalProfileImgUri(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!firestoreUser?.uid || !localProfileImgUri) {
            console.log("Missing data: ", firestoreUser, localProfileImgUri);
            return;
        }

        setIsUploading(true);

        try {
            const newImageUrl = await UsersService.uploadProfileImgToFirestore(
                firestoreUser.uid,
                localProfileImgUri
            );
            if (newImageUrl) {
                setProfileImage(newImageUrl);
                setFirestoreUser({ ...firestoreUser, imageUrl: newImageUrl });
                setLocalProfileImgUri(null);
            }
        } catch (error) {
            console.error("Error calling upload function:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setLocalProfileImgUri(null);
    };
    return (
        <View>
            {/* Profile Image Display */}
            {profileImage ? (
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        style={styles.image}
                        source={{ uri: profileImage }}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={pickImage}
                >
                    <Ionicons
                        name="camera-outline"
                        size={80}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            )}
            {/* Confirm & Cancel Buttons */}
            {localProfileImgUri && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleUpload}
                        style={[
                            styles.button,
                            isUploading ? styles.disabledButton : {},
                        ]}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <ActivityIndicator color={COLORS.white} />
                        ) : (
                            <Text style={styles.buttonText}>Bekräfta</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelButtonText}>Avbryt</Text>
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
        borderColor: COLORS.white,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 999,
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: "bold",
    },
    cancelButton: {
        backgroundColor: COLORS.lightGray,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: COLORS.white,
    },
    disabledButton: {
        opacity: 0.5,
    },
});
