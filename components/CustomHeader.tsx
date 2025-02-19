import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
import { handleSignOut } from "@/services/handlers";

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
                    <TouchableOpacity>
                        <Ionicons
                            name="people-outline"
                            size={32}
                            color={COLORS.pewter}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignOut}>
                        <Ionicons
                            name="log-out-outline"
                            size={32}
                            color={COLORS.pewter}
                            style={styles.icon}
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
        backgroundColor: COLORS.cyan,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    text: {
        color: COLORS.pewter,
        fontSize: 28,
        fontFamily: "Kurale-Regular",
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 20,
    },
    icon: {},
});
