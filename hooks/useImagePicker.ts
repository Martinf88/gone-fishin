import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useAuthStore } from "@/store/useStore";

type ImageType = "profile" | "form";

export const useImagePicker = (imageType: ImageType) => {
    const {
        localFormImageUri,
        setLocalFormImageUri,
        localProfileImgUri,
        setLocalProfileImgUri,
        firestoreUser,
    } = useAuthStore((state) => state);

    const selectedImage =
        imageType === "profile"
            ? localProfileImgUri || firestoreUser?.imageUrl
            : localFormImageUri;

    const requestPermissions = async () => {
        const { granted } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
            Alert.alert(
                "Permission Required",
                "You need to allow access to your photos."
            );
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        if (!(await requestPermissions())) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: imageType === "profile",
            aspect: [4, 3],
            quality: 0.6,
        });

        if (!result.canceled) {
            if (imageType === "profile") {
                setLocalProfileImgUri(result.assets[0].uri);
            } else {
                setLocalFormImageUri(result.assets[0].uri);
            }
        }
    };

    const clearImage = () => {
        if (imageType === "profile") {
            setLocalProfileImgUri(null);
        } else {
            setLocalFormImageUri(null);
        }
    };

    return {
        selectedImage,
        pickImage,
        clearImage,
    };
};
