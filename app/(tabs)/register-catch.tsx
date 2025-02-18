import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import FormField from "@/components/FormField";

import CustomButton from "@/components/CustomButton";
import { handleRegisterCatch } from "@/services/handlers";
import { StatusBar } from "expo-status-bar";
import DateTimePicker from "@/components/DateTimePicker";
import FormNav from "@/components/FormNav";
import FormAddImgBtn from "@/components/FormAddImgBtn";
import FormLocationPickerBtn from "@/components/FormLocationPickerBtn";

const Create = () => {
    const [form, setForm] = useState({
        speciesName: "",
        length: "",
        weight: "",
        method: "",
        bait: "",
        description: "",
        location: null,
        date: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <FormNav />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    {/* 📌 ImagePicker UI */}
                    <FormAddImgBtn />
                    <FormLocationPickerBtn />
                    {/* 📌 Formulärfält */}
                    <FormField
                        title="Art"
                        value={form.speciesName}
                        handleChangeText={(e: string) =>
                            handleInputChange("speciesName", e)
                        }
                        keyboardType="catch"
                    />
                    <FormField
                        title="Längd"
                        value={form.length}
                        handleChangeText={(e: string) =>
                            handleInputChange("length", e)
                        }
                        keyboardType="catch"
                    />
                    <FormField
                        title="Vikt"
                        value={form.weight}
                        handleChangeText={(e: string) =>
                            handleInputChange("weight", e)
                        }
                        keyboardType="catch"
                    />

                    <FormField
                        title="Metod"
                        value={form.method}
                        handleChangeText={(e: string) =>
                            handleInputChange("method", e)
                        }
                        keyboardType="catch"
                    />
                    <FormField
                        title="Bete"
                        value={form.bait}
                        handleChangeText={(e: string) =>
                            handleInputChange("bait", e)
                        }
                        keyboardType="catch"
                    />
                    <FormField
                        title="Beskrivning"
                        value={form.description}
                        handleChangeText={(e: string) =>
                            handleInputChange("description", e)
                        }
                        keyboardType="catch"
                    />
                    <View style={styles.dateTimePicker}>
                        <DateTimePicker />
                    </View>

                    <CustomButton
                        title="Bekräfta"
                        handlePress={() =>
                            handleRegisterCatch({ ...form, setIsLoading })
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
    },
    container: {
        paddingHorizontal: 10,
    },
    dateTimePicker: {
        marginTop: 20,
    },
});
