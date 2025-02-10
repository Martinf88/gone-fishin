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
        backgroundColor: COLORS.yellow,
        paddingHorizontal: 32,
        paddingVertical: 6,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 24,
        color: COLORS.darkBlue,
        fontFamily: "OpenSans",
        textAlign: "center",
    },
});
