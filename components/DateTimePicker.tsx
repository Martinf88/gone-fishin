import { COLORS } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                <Text style={styles.buttonText}>Välj Datum & Tid</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {selectedDate && (
                <Text style={styles.selectedDate}>
                    Vald tid: {selectedDate.toLocaleString()}
                </Text>
            )}
        </View>
    );
};

export default DateTimePicker;

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.blueGray, // Lila knappfärg
        padding: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: COLORS.primary,
        fontSize: 16,
        textAlign: "center",
        fontFamily: "Kurale-Regular",
    },
    selectedDate: {
        marginTop: 10,
        color: COLORS.pewter,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
    },
});
