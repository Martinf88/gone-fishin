import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";

const FormAddImgBtn = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <View style={styles.imagePickerContainer}>
            {selectedImage ? (
                <Image
                    source={{ uri: selectedImage }}
                    style={styles.imagePreview}
                />
            ) : (
                <TouchableOpacity style={styles.imagePickerButton}>
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
