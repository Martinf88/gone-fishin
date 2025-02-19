import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateTimePicker = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    // Show/hide date picker
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    // Show/hide time picker
    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);

    // Handle date selection
    const handleDateConfirm = (date: Date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    // Handle time selection
    const handleTimeConfirm = (time: Date) => {
        setSelectedTime(time);
        hideTimePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Datum & Tid</Text>

            {/* 📌 Button for picking DATE */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { marginRight: 10 }]}
                    onPress={showDatePicker}
                >
                    <Text style={styles.buttonText}>Välj Datum</Text>
                    <Ionicons
                        name="calendar-outline"
                        size={24}
                        color={COLORS.pewter}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />

                {/* 📌 Button for picking TIME */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={showTimePicker}
                >
                    <Text style={styles.buttonText}>Välj Tid</Text>
                    <Ionicons
                        name="time-outline"
                        size={24}
                        color={COLORS.pewter}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                />
            </View>

            {/* 📌 Display selected values */}
            <View style={styles.selectedContainer}>
                {selectedDate && (
                    <Text style={styles.selectedText}>
                        📅 Datum: {selectedDate.toLocaleDateString()}
                    </Text>
                )}
                {selectedTime && (
                    <Text style={styles.selectedText}>
                        ⏰ Tid:{" "}
                        {selectedTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default DateTimePicker;

const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
    },
    label: {
        color: COLORS.pewter,
        fontSize: 18,
        fontFamily: "Kurale-Regular",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        backgroundColor: COLORS.cyan,
        padding: 12,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonText: {
        color: COLORS.pewter,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
    },
    selectedContainer: {
        flexDirection: "row",
        gap: 10,
    },
    selectedText: {
        color: COLORS.pewter,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
        marginTop: 5,
    },
});
