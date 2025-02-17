import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import FormField from "@/components/FormField";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { handleRegisterCatch } from "@/services/handlers";
import { StatusBar } from "expo-status-bar";

const Create = () => {
    const [form, setForm] = useState({
        speciesName: "",
        length: "",
        weight: "",
        method: "",
        bait: "",
        location: "",
        date: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Gone Fishin'</Text>
                    <View style={styles.formContainer}>
                        <Text style={styles.subTitle}>Skapa konto</Text>
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
                        <Ionicons
                            name="scale-outline"
                            size={28}
                            color={COLORS.pewter}
                            style={styles.icon}
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
                            title="Plats"
                            value={form.location}
                            handleChangeText={(e: string) =>
                                handleInputChange("location", e)
                            }
                            keyboardType="catch"
                        />
                        <Ionicons
                            name="location-outline"
                            size={28}
                            color={COLORS.pewter}
                            style={styles.icon}
                        />
                        <FormField
                            title="Datum"
                            value={form.date}
                            handleChangeText={(e: string) =>
                                handleInputChange("date", e)
                            }
                            keyboardType="catch"
                        />
                        <Ionicons
                            name="calendar-outline"
                            size={28}
                            color={COLORS.pewter}
                            style={styles.icon}
                        />
                        <CustomButton
                            title={"Bekräfta"}
                            handlePress={() =>
                                handleRegisterCatch({
                                    speciesName: form.speciesName,
                                    length: form.length,
                                    weight: form.weight,
                                    method: form.method,
                                    bait: form.bait,
                                    location: form.location,
                                    date: form.date,
                                    setIsLoading,
                                })
                            }
                            isLoading={isLoading}
                        />
                    </View>
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
    },
    container: {
        paddingTop: 50,
        paddingHorizontal: 10,
        width: "100%",
        // minHeight: height * 0.85,
        height: "100%",
        // justifyContent: "center",
    },
    title: {
        fontSize: 42,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
        textAlign: "center",
    },
    subTitle: {
        fontSize: 24,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
        fontWeight: "bold",
    },
    formContainer: {
        width: "100%",
        paddingTop: 50,
        gap: 25,
    },
    icon: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 11,
    },
});
