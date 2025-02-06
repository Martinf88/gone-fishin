import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";

interface CustomButtonProps {
    text: string;
}

const CustomButton = ({ text }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
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
        fontFamily: "Kurale-Regular",
    },
});
