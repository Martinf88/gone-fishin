import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Text,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/common/CustomButton";
import CatchesService from "@/services/catches";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@/components/register-catch/DateTimePicker";
import FormNav from "@/components/common/FormNav";
import FormAddImgBtn from "@/components/register-catch/FormAddImgBtn";
import FormSelectLocation from "@/components/register-catch/FormSelectLocation";
import { CatchForm, useAuthStore } from "@/store/useStore";
import { useRouter } from "expo-router";
import CustomPicker from "@/components/register-catch/CustomPicker";
import fishSpecies from "@/constants/fishSpecies.json";
import fishingMethods from "@/constants/fishingMethods.json";

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

                    {/* 📌 Form Fields */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Art</Text>
                        <CustomPicker
                            selectedValue={catchForm.speciesName}
                            updateCatchField={updateCatchField}
                            field="speciesName"
                            items={fishSpecies}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Bete</Text>
                        <View style={styles.inputContainer}>
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

                    <View style={styles.doubleInputWrapper}>
                        <View style={styles.inputWrapperHalf}>
                            <Text style={styles.label}>Längd (cm)</Text>
                            <View style={styles.inputContainer}>
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
                        </View>
                        <View style={styles.inputWrapperHalf}>
                            <Text style={styles.label}>Vikt (kg)</Text>
                            <View style={styles.inputContainer}>
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
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Metod</Text>
                        <CustomPicker
                            selectedValue={catchForm.method}
                            updateCatchField={updateCatchField}
                            field="method"
                            items={fishingMethods}
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

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Berättelse</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.descriptionInput]}
                                placeholder="Berätta om din fångst..."
                                placeholderTextColor={COLORS.placeholder}
                                value={catchForm.description}
                                onChangeText={(text) =>
                                    handleInputChange("description", text)
                                }
                                multiline
                            />
                        </View>
                    </View>

                    <CustomButton
                        title="Bekräfta"
                        handlePress={handleSubmit}
                        isLoading={isLoading}
                        containerStyles={{ marginTop: 10 }}
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

    /* 📌 Individual Input Wrapper */
    inputWrapper: {
        marginBottom: 15,
    },

    /* 📌 Double Inputs in One Row */
    doubleInputWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    inputWrapperHalf: {
        flex: 1,
        marginRight: 10,
    },

    /* 📌 Wrapper for TextInputs (fixes border issues) */
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.placeholder,
        borderRadius: 5,
        overflow: "hidden", // ✅ Ensures background doesn't cover border
        backgroundColor: COLORS.secondary,
    },

    /* 📌 TextInput Styling */
    input: {
        color: COLORS.white,
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
        height: 50,
    },

    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
    },

    /* 📌 Label Styling */
    label: {
        fontSize: 18,
        color: COLORS.white,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
});
