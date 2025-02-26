import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/common/CustomButton";
import CatchesService from "@/services/catches";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@/components/register-catch/DateTimePicker";
import FormNav from "@/components/common/FormNav";
import FormAddImgBtn from "@/components/register-catch/FormAddImgBtn";
import FormSelectLocation from "@/components/register-catch/FormSelectLocation";
import { CatchForm, useAuthStore } from "@/store/useStore";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import CustomPicker from "@/components/common/CustomPicker";

//TODO: onBlur seems to be a bit buggy, its easy to not get the value from a field. Find a solution.
//TODO: clear form after submit
//TODO: validate form

const Create = () => {
    const { catchForm, updateCatchField, resetCatchForm } = useAuthStore(
        (state) => state
    );
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const router = useRouter();

    const handleInputChange = (field: keyof CatchForm, value: any) => {
        updateCatchField(field, value);
    };
    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            await CatchesService.handleRegisterCatch(catchForm);

            resetCatchForm();
            setSelectedDate(null);
            setSelectedTime(null);
        } catch (error) {
            console.error("Error submitting catch:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormNav title={"FångstData"} onPress={() => router.back()} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {/* 📌 ImagePicker UI */}
                    <FormAddImgBtn />

                    {/* 📌 Formulärfält */}
                    <View style={styles.inputWrapper}>
                        <View
                            style={[
                                styles.inputContainerHalf,
                                { marginRight: 10 },
                            ]}
                        >
                            <Text style={styles.label}>Art</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex. Gädda"
                                placeholderTextColor={COLORS.placeholder}
                                value={catchForm.speciesName}
                                onChangeText={(text) =>
                                    handleInputChange("speciesName", text)
                                }
                            />
                        </View>
                        <View style={styles.inputContainerHalf}>
                            <Text style={styles.label}>Bete</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex. Jerkbait"
                                placeholderTextColor={COLORS.placeholder}
                                value={catchForm.bait}
                                onChangeText={(text) =>
                                    handleInputChange("bait", text)
                                }
                            />
                        </View>
                    </View>

                    <View style={styles.inputWrapper}>
                        <View
                            style={[
                                styles.inputContainerHalf,
                                { marginRight: 10 },
                            ]}
                        >
                            <Text style={styles.label}>Längd (cm)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Längd i cm"
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="numeric"
                                value={
                                    catchForm.length !== null
                                        ? catchForm.length.toString()
                                        : ""
                                }
                                onChangeText={(number) =>
                                    handleInputChange("length", number)
                                }
                            />
                        </View>
                        <View style={styles.inputContainerHalf}>
                            <Text style={styles.label}>Vikt (kg)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Vikt i kg"
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="numeric"
                                value={
                                    catchForm.weight !== null
                                        ? catchForm.weight.toString()
                                        : ""
                                }
                                onChangeText={(number) =>
                                    handleInputChange("weight", number)
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Metod</Text>
                        <CustomPicker
                            selectedValue={catchForm.method}
                            updateCatchField={updateCatchField}
                        />
                    </View>

                    {/* 📌 LocationPicker UI */}
                    <FormSelectLocation />

                    {/* 📌 DateTimePicker UI */}
                    <DateTimePicker
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        setSelectedDate={setSelectedDate}
                        setSelectedTime={setSelectedTime}
                    />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Berättelse</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            placeholder="Berätta om din fångst..."
                            placeholderTextColor={COLORS.placeholder}
                            value={catchForm.description}
                            onChangeText={(text) =>
                                handleInputChange("description", text)
                            }
                        />
                    </View>
                    <CustomButton
                        title="Bekräfta"
                        handlePress={handleSubmit}
                        isLoading={isLoading}
                        containerStyles={{ marginTop: 20 }}
                    />
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default Create;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        marginTop: 20,
        paddingBottom: 40,
    },
    container: {
        paddingHorizontal: 10,
    },
    inputWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    /* 📌 Styling för TextInputs */
    inputContainer: {
        marginBottom: 15,
    },
    inputContainerHalf: {
        flex: 1,
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        color: COLORS.white,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
    input: {
        backgroundColor: COLORS.secondary,
        color: COLORS.white,
        fontSize: 16,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.placeholder,
        height: 45,
    },

    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
    },
});
