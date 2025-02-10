import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

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
            {iconComponent && <View>{iconComponent}</View>}
            <TextInput
                style={styles.input}
                value={value}
                placeholder={palceholderText}
                placeholderTextColor={COLORS.blueGray}
                onChangeText={handleChangeText}
                secureTextEntry={keyBoardType === "password" && !showPassword}
            />
            {title === "Password" && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setshowPassword(!showPassword)}
                >
                    {!showPassword ? (
                        <Ionicons
                            name="eye-outline"
                            size={28}
                            color={COLORS.blueGray}
                        />
                    ) : (
                        <Ionicons
                            name="eye-off-outline"
                            size={28}
                            color={COLORS.blueGray}
                        />
                    )}
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
        position: "relative",
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
