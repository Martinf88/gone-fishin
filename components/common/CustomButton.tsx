import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";

interface CustomButtonProps {
    title: string;
    handlePress: () => void;
    containerStyles?: object;
    textStyles?: object;
    isLoading?: boolean;
}

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    isLoading,
    textStyles,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePress}
            style={[
                styles.button,
                containerStyles,
                isLoading ? { opacity: 0.5 } : {},
            ]}
            disabled={isLoading}
        >
            <Text style={[styles.buttonText, textStyles]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.action,
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 22,
        color: COLORS.secondary,
        textAlign: "center",
    },
});
