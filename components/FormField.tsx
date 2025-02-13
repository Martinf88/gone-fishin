import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FormFieldProps {
    title?: string;
    placeholderText?: string;
    value: string;
    handleChangeText: (e: string) => void;
    otherStyles?: object;
    keyboardType?: string;
    iconComponent?: JSX.Element;
}

const FormField = ({
    title,
    value,
    handleChangeText,
    otherStyles,
    keyboardType,
    placeholderText,
    iconComponent,
}: FormFieldProps) => {
    const [showPassword, setshowPassword] = useState(false);

    const isPassWordField =
        title === "Lösenord" || title === "Upprepa Lösenord";
    return (
        <View style={[styles.container, otherStyles]}>
            {iconComponent && <View>{iconComponent}</View>}
            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholderText}
                placeholderTextColor={COLORS.blueGray}
                onChangeText={handleChangeText}
                secureTextEntry={keyboardType === "password" && !showPassword}
            />
            {isPassWordField && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setshowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={28}
                        color={COLORS.blueGray}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FormField;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 50,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        color: COLORS.pewter,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        height: "100%",
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        position: "absolute",
        right: 10,
    },
});
