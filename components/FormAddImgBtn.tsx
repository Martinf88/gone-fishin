import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useAuthStore } from "@/store/useStore";
import { uploadToCloudinary } from "@/services/uploadToCloudinary";

const FormAddImgBtn = () => {
    const { localImageUri, setLocalImageUri } = useAuthStore((state) => state);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.6,
        });

        if (!result.canceled) {
            setLocalImageUri(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!localImageUri) {
            Alert.alert("Error", "No image selected!");
            return;
        }

        try {
            const imageUrl = await uploadToCloudinary(localImageUri);
            console.log("✅ Image uploaded successfully:", imageUrl);
            Alert.alert("Success", "Image uploaded to Cloudinary!");
        } catch (error) {
            console.error("Upload error:", error);
            Alert.alert("Error", "Failed to upload image.");
        }
    };

    return (
        <View style={styles.imagePickerContainer}>
            {localImageUri ? (
                <View style={styles.imagePreviewContainer}>
                    <Image
                        source={{ uri: localImageUri }}
                        style={styles.imagePreview}
                    />
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => setLocalImageUri(null)}
                    >
                        <Ionicons
                            name={"close-circle"}
                            size={24}
                            color={COLORS.pewter}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={handleUpload}
                    >
                        <Text style={styles.uploadButtonText}>
                            Upload Image
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.imagePickerButton}
                    onPress={pickImage}
                >
                    <Ionicons name="camera" size={32} color={COLORS.ebony} />
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
    uploadButton: {
        marginTop: 10,
        backgroundColor: COLORS.yellow,
        padding: 10,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: COLORS.ebony,
        fontSize: 16,
        fontWeight: "bold",
    },
    imagePickerButton: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: COLORS.mistyBlue,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePickerText: {
        color: COLORS.ebony,
        marginTop: 8,
        fontSize: 14,
    },
    imagePreview: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});
