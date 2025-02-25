import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FormNavProps {
    title: string;
    onPress: () => void;
}

const FormNav = ({ title, onPress }: FormNavProps) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons
                    name="arrow-u-left-top"
                    size={28}
                    color={COLORS.white}
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
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    backButtonText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
        fontWeight: "bold",
        marginBottom: 3,
    },
});
