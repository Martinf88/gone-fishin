import { StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { CatchForm } from "@/store/useStore";

interface CustomPickerProps {
    selectedValue: string;
    updateCatchField: (field: keyof CatchForm, value: any) => void;
}

const CustomPicker = ({
    selectedValue,
    updateCatchField,
}: CustomPickerProps) => {
    return (
        <View style={styles.pickerWrapper}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>
                    updateCatchField("method", itemValue)
                }
            >
                <Picker.Item label="Välj metod" value="" />
                <Picker.Item label="Spinnfiske" value="Spinnfiske" />
                <Picker.Item label="Flugfiske" value="Flugfiske" />
                <Picker.Item label="Trolling" value="Trolling" />
                <Picker.Item label="Havsfiske" value="HavsFiske" />
                <Picker.Item label="Handrev" value="Handrev" />
                <Picker.Item label="Bottenmete" value="Bottenmete" />
                <Picker.Item label="Jerkfiske" value="Jerkfiske" />
                <Picker.Item label="Jiggfiske" value="Jiggfiske" />
                <Picker.Item label="Flötmete" value="Flötmete" />
                <Picker.Item label="Isfiske" value="IsFiske" />
                <Picker.Item label="Vertikalfiske" value="Vertikalfiske" />
            </Picker>
            {/* Custom Down Arrow */}
            <Ionicons
                name="chevron-down"
                size={24}
                color="white"
                style={styles.icon}
            />
        </View>
    );
};

export default CustomPicker;

const styles = StyleSheet.create({
    pickerWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.placeholder,
    },
    picker: {
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    icon: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
});
