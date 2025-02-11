import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";

interface CustomHeaderProps {
    title: string;
    showButtons: boolean;
}

const CustomHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Profil</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity>
                    {" "}
                    <Ionicons
                        name="person-outline"
                        size={28}
                        color={COLORS.pewter}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons
                        name="log-out-outline"
                        size={28}
                        color={COLORS.pewter}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.darkBlue,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    text: {
        color: COLORS.pewter,
        fontSize: 28,
        fontFamily: "Kurale-Regular",
    },
    buttonWrapper: {
        flexDirection: "row",
    },
    icon: {},
});
