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
import CustomButton from "@/components/CustomButton";
import { handleRegisterCatch } from "@/services/handlers";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@/components/DateTimePicker";
import FormNav from "@/components/FormNav";
import FormAddImgBtn from "@/components/FormAddImgBtn";
import FormLocationPickerBtn from "@/components/FormLocationPickerBtn";
import { CatchForm, useAuthStore } from "@/store/useStore";
import { Picker } from "@react-native-picker/picker";

const Create = () => {
    const { catchForm, updateCatchField } = useAuthStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof CatchForm) => (text: string) => {
        updateCatchField(field, text ? parseFloat(text) : null);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormNav title={"FångstData"} />
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
                                placeholderTextColor={COLORS.mistyBlue}
                                value={catchForm.speciesName}
                                onChangeText={handleInputChange("speciesName")}
                            />
                        </View>
                        <View style={styles.inputContainerHalf}>
                            <Text style={styles.label}>Bete</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex. Jerkbait"
                                placeholderTextColor={COLORS.mistyBlue}
                                value={catchForm.bait}
                                onChangeText={handleInputChange("bait")}
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
                                placeholderTextColor={COLORS.mistyBlue}
                                keyboardType="numeric"
                                value={
                                    catchForm.length !== null
                                        ? catchForm.length.toString()
                                        : ""
                                }
                                onChangeText={handleInputChange("length")}
                            />
                        </View>
                        <View style={styles.inputContainerHalf}>
                            <Text style={styles.label}>Vikt (kg)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Vikt i kg"
                                placeholderTextColor={COLORS.mistyBlue}
                                keyboardType="numeric"
                                value={
                                    catchForm.weight !== null
                                        ? catchForm.weight.toString()
                                        : ""
                                }
                                onChangeText={handleInputChange("weight")}
                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Metod</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                style={styles.picker}
                                selectedValue={catchForm.method}
                                onValueChange={(itemValue) =>
                                    updateCatchField("method", itemValue)
                                }
                            >
                                <Picker.Item label="Välj metod" value="" />
                                <Picker.Item label="Spinnfiske" value="spinn" />
                                <Picker.Item label="Flugfiske" value="fly" />
                                <Picker.Item label="Trolling" value="troll" />
                                <Picker.Item label="Havsfiske" value="sea" />
                                <Picker.Item label="Handrev" value="hand" />
                                <Picker.Item label="Bottenmete" value="mete" />
                                <Picker.Item label="Jerkfiske" value="jerk" />
                                <Picker.Item label="Jiggfiske" value="jigg" />
                                <Picker.Item label="Flötmete" value="float" />
                                <Picker.Item label="Isfiske" value="ice" />
                                <Picker.Item
                                    label="Vertikalfiske"
                                    value="vert"
                                />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Beskrivning</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            placeholder="Beskrivning av fångsten"
                            placeholderTextColor={COLORS.mistyBlue}
                            value={catchForm.description}
                            onChangeText={handleInputChange("description")}
                            multiline
                        />
                    </View>
                    {/* 📌 LocationPicker UI */}
                    {/* <FormLocationPickerBtn
                    location={form.location}
                    onPress={handlePickLocation}
                    /> */}

                    {/* 📌 DateTimePicker UI */}
                    <DateTimePicker />

                    <CustomButton
                        title="Bekräfta"
                        handlePress={() =>
                            handleRegisterCatch({ ...catchForm, setIsLoading })
                        }
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
        backgroundColor: COLORS.ebony,
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
        marginBottom: 10,
    },
    inputContainerHalf: {
        flex: 1,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: COLORS.pewter,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
    input: {
        backgroundColor: COLORS.cyan,
        color: COLORS.pewter,
        fontSize: 16,
        padding: 12,
        borderRadius: 5,
        height: 45,
    },
    pickerWrapper: {
        backgroundColor: COLORS.cyan,
        borderRadius: 5,
    },
    picker: {
        color: COLORS.pewter,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
    },
});
