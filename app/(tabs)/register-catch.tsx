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
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

//TODO: onBlur seems to be a bit buggy, its easy to not get the value from a field. Find a solution.
//TODO: clear form after submit
//TODO: validate form

const Create = () => {
    const { catchForm, updateCatchField } = useAuthStore((state) => state);
    const [localForm, setLocalForm] = useState(catchForm);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleInputChange = (field: keyof CatchForm, value: any) => {
        setLocalForm((prev) => ({ ...prev, [field]: value }));
    };
    const handleBlur = (field: keyof CatchForm) => {
        updateCatchField(field, localForm[field]);
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
                                value={localForm.speciesName}
                                onChangeText={(text) =>
                                    handleInputChange("speciesName", text)
                                }
                                onBlur={() => handleBlur("speciesName")}
                            />
                        </View>
                        <View style={styles.inputContainerHalf}>
                            <Text style={styles.label}>Bete</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="ex. Jerkbait"
                                placeholderTextColor={COLORS.placeholder}
                                value={localForm.bait}
                                onChangeText={(text) =>
                                    handleInputChange("bait", text)
                                }
                                onBlur={() => handleBlur("bait")}
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
                                    localForm.length !== null
                                        ? localForm.length.toString()
                                        : ""
                                }
                                onChangeText={(number) =>
                                    handleInputChange("length", number)
                                }
                                onBlur={() => handleBlur("length")}
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
                                    localForm.weight !== null
                                        ? localForm.weight.toString()
                                        : ""
                                }
                                onChangeText={(number) =>
                                    handleInputChange("weight", number)
                                }
                                onBlur={() => handleBlur("weight")}
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
                        <Text style={styles.label}>Berättelse</Text>
                        <TextInput
                            style={[styles.input, styles.descriptionInput]}
                            placeholder="Berätta om din fångst..."
                            placeholderTextColor={COLORS.placeholder}
                            value={localForm.description}
                            onChangeText={(text) =>
                                handleInputChange("description", text)
                            }
                            onBlur={() => handleBlur("description")}
                            multiline
                        />
                    </View>
                    {/* 📌 LocationPicker UI */}
                    <FormSelectLocation />

                    {/* 📌 DateTimePicker UI */}
                    <DateTimePicker />

                    <CustomButton
                        title="Bekräfta"
                        handlePress={() =>
                            CatchesService.handleRegisterCatch({ ...catchForm })
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
        marginBottom: 10,
    },
    inputContainerHalf: {
        flex: 1,
        marginBottom: 10,
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
        borderRadius: 5,
        height: 45,
    },
    pickerWrapper: {
        backgroundColor: COLORS.secondary,
        borderRadius: 5,
    },
    picker: {
        color: COLORS.white,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: "top",
    },
});
