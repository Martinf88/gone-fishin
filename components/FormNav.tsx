import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const FormNav = () => {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={28} color={COLORS.pewter} />
            </TouchableOpacity>
            <Text style={styles.backButtonText}>Fångstdata</Text>
        </View>
    );
};

export default FormNav;

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    backButtonText: {
        fontSize: 18,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
        fontWeight: "bold",
        marginBottom: 3,
    },
});
