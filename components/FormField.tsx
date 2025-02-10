import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";

interface FormFieldProps {
    title?: string;
    palceholderText?: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: object;
    keyBoardType?: string;
    iconComponent?: JSX.Element;
}

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyBoardType,
    palceholderText,
    iconComponent,
}: FormFieldProps) => {
    const [showPassword, setshowPassword] = useState(false);
    return (
        <View style={[otherStyles, styles.container]}>
            {iconComponent && (
                <View style={styles.iconContainer}>{iconComponent}</View>
            )}
            <TextInput
                style={styles.input}
                value={value}
                placeholder={palceholderText}
                placeholderTextColor={COLORS.blueGray}
                onChangeText={handleChangeText}
                secureTextEntry={keyBoardType === "password" && !showPassword}
            />
        </View>
    );
};

export default FormField;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 45,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        color: COLORS.pewter,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: "100%",
    },
});
