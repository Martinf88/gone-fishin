import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

interface FormLocationPickerBtnProps {
    // location: string | null;
    // onPress: () => void;
}

const FormLocationPickerBtn = (
    {
        // location,
        // onPress,
    }: FormLocationPickerBtnProps
) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Fångstplats</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    {location ? `📍 ${location}` : "Välj plats"}
                </Text>
                <Ionicons
                    name="location-outline"
                    size={20}
                    color={COLORS.pewter}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FormLocationPickerBtn;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: COLORS.pewter,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.cyan,
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.pewter,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
    },
});
