import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface FormNavProps {
    title: string;
}

const FormNav = ({ title }: FormNavProps) => {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
                <MaterialCommunityIcons
                    name="arrow-u-left-top"
                    size={28}
                    color={COLORS.mistyBlue}
                />
            </TouchableOpacity>
            <Text style={styles.backButtonText}>{title}</Text>
        </View>
    );
};

export default FormNav;

const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        paddingHorizontal: 10,
        backgroundColor: COLORS.ebony,
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
