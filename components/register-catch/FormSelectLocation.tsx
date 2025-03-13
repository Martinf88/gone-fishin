import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { useAuthStore } from "@/store/useStore";
import MapPicker from "./MapPicker";

const FormSelectLocation = () => {
    const { catchForm } = useAuthStore((state) => state);
    const [isMapVisible, setIsMapVisible] = useState(false);

    useEffect(() => {
        console.log("Updated CatchForm:", catchForm);
    }, [catchForm]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Fångstplats</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setIsMapVisible(!isMapVisible)}
            >
                <Text style={styles.buttonText}>
                    {catchForm.location.latitude && catchForm.location.longitude
                        ? `Lat: ${catchForm.location.latitude.toFixed(5)}, Lon: ${catchForm.location.longitude.toFixed(5)}`
                        : "Välj plats"}
                </Text>
                <Ionicons
                    name="location-outline"
                    size={20}
                    color={COLORS.placeholder}
                />
            </TouchableOpacity>
            <MapPicker
                isVisible={isMapVisible}
                onClose={() => setIsMapVisible(false)}
            />
        </View>
    );
};

export default FormSelectLocation;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: COLORS.placeholder,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.secondary,
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.placeholder,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
    },
});
