import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
import { handleSignOut } from "@/services/auth";

interface CustomHeaderProps {
    title: string | undefined;
    showButtons: boolean;
}

const CustomHeader = ({ title, showButtons }: CustomHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
            {showButtons && (
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Ionicons
                            name="log-out-outline"
                            size={32}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.secondary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    text: {
        color: COLORS.white,
        fontSize: 28,
        fontFamily: "Kurale-Regular",
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 20,
    },
});
