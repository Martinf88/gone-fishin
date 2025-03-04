import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "@/store/useStore";
import { useEffect } from "react";

const FormAddImgBtn = () => {
    const { localFormImageUri, setLocalFormImageUri } = useAuthStore(
        (state) => state
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if (!result.canceled) {
            setLocalFormImageUri(result.assets[0].uri);
        }
    };

    //TODO: Remove after testing is done
    useEffect(() => {
        console.log("Updated localImageUri:", localFormImageUri);
    }, [localFormImageUri]);

    return (
        <View style={styles.imagePickerContainer}>
            {localFormImageUri ? (
                <View style={styles.imagePreviewContainer}>
                    <Image
                        source={{ uri: localFormImageUri }}
                        style={styles.imagePreview}
                    />
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => setLocalFormImageUri(null)}
                    >
                        <Ionicons
                            name={"close-circle"}
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={pickImage}
                >
                    <Ionicons name="camera" size={32} color={COLORS.white} />
                    <Text style={styles.imagePickerText}>Lägg till bild</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FormAddImgBtn;

const styles = StyleSheet.create({
    imagePickerContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    imagePreviewContainer: {
        position: "relative",
        alignItems: "center",
    },
    removeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 12,
        padding: 4,
    },

    imagePickerButton: {
        width: 100,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.white,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePickerText: {
        color: COLORS.white,
        marginTop: 8,
        fontSize: 14,
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});
