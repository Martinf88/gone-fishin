import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
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
            {iconComponent && (
                <View
                    style={{
                        backgroundColor: COLORS.mistyBlue,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        height: 50,
                        justifyContent: "center",
                        paddingHorizontal: 10,
                    }}
                >
                    {iconComponent}
                </View>
            )}
            <View style={{ flexDirection: "column", flex: 1 }}>
                {keyboardType === "catch" && (
                    <Text
                        style={{
                            color: COLORS.pewter,
                            fontFamily: "Kurale-Regular",
                            fontSize: 18,
                        }}
                    >
                        {title}
                    </Text>
                )}

                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={placeholderText}
                    placeholderTextColor={COLORS.mistyBlue}
                    onChangeText={handleChangeText}
                    secureTextEntry={
                        keyboardType === "password" && !showPassword
                    }
                />
            </View>
            {isPassWordField && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setshowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={28}
                        color={COLORS.mistyBlue}
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
    },
    input: {
        backgroundColor: COLORS.cyan,
        color: COLORS.mistyBlue,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        padding: 11,
        fontSize: 16,
        height: 50,
    },
    button: {
        position: "absolute",
        right: 10,
    },
});
