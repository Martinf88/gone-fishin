import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuthStore } from "@/store/useStore";

interface DateTimePickerProps {
    selectedDate: Date | null;
    selectedTime: Date | null;
    setSelectedDate: (date: Date) => void;
    setSelectedTime: (time: Date) => void;
}

const DateTimePicker = ({
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
}: DateTimePickerProps) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const { updateCatchField } = useAuthStore((state) => state);

    // Show/hide date picker
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    // Show/hide time picker
    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);

    // Handle date selection
    const handleDateConfirm = (date: Date) => {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0); // ✅ Removes time part

        setSelectedDate(dateOnly);
        updateCatchField("date", dateOnly); // ✅ Store only the date part
        hideDatePicker();
    };

    // Handle time selection
    const handleTimeConfirm = (time: Date) => {
        const timeOnly = new Date();
        timeOnly.setHours(time.getHours(), time.getMinutes(), 0, 0); // ✅ Removes date part

        setSelectedTime(timeOnly);
        updateCatchField("time", timeOnly); // ✅ Store only the time part
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
                    <Text style={styles.buttonText}>
                        {selectedDate
                            ? selectedDate.toLocaleDateString()
                            : "Välj Datum"}
                    </Text>
                    <Ionicons
                        name="calendar-outline"
                        size={24}
                        color={COLORS.placeholder}
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
                    <Text style={styles.buttonText}>
                        {selectedTime
                            ? selectedTime.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              })
                            : "Välj Tid"}
                    </Text>
                    <Ionicons
                        name="time-outline"
                        size={24}
                        color={COLORS.placeholder}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                />
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
        color: COLORS.placeholder,
        fontSize: 18,
        fontFamily: "Kurale-Regular",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        backgroundColor: COLORS.secondary,
        padding: 12,
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonText: {
        color: COLORS.placeholder,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
    },
});
