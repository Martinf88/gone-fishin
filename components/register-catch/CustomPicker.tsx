import { StyleSheet, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { CatchForm } from "@/store/useStore";

interface CustomPickerProps {
    selectedValue: string;
    updateCatchField: (field: keyof CatchForm, value: any) => void;
    field: keyof CatchForm; // ✅ Allows using this picker for different fields
    items: { label: string; value: string }[]; // ✅ Now accepts a list of items as a prop
}

const CustomPicker = ({
    selectedValue,
    updateCatchField,
    field,
    items,
}: CustomPickerProps) => {
    return (
        <View style={styles.pickerWrapper}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(itemValue) =>
                    updateCatchField(field, itemValue)
                }
            >
                <Picker.Item label="Välj ett alternativ" value="" />
                {items.map((item) => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
            {/* Custom Down Arrow */}
            <Ionicons
                name="chevron-down"
                size={24}
                color={COLORS.placeholder}
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
        // borderWidth: 1,
        borderColor: COLORS.placeholder,
    },
    picker: {
        color: COLORS.placeholder,
        fontFamily: "Kurale-Regular",
    },
    icon: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
});
