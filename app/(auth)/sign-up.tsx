import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSignUp } from "@/services/handlers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FormNav from "@/components/FormNav";

const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FormNav title={"Skapa Konto"} />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Skapa Konto</Text>
                    <View style={styles.formContainer}>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: string) =>
                                handleInputChange("email", e)
                            }
                            keyboardType="email-adress"
                            placeholderText="example@example.com"
                            iconComponent={
                                <MaterialIcons
                                    name="alternate-email"
                                    size={28}
                                    color={COLORS.cyan}
                                />
                            }
                        />
                        <FormField
                            title="Användarnamn"
                            value={form.username}
                            handleChangeText={(e: string) =>
                                handleInputChange("username", e)
                            }
                            keyboardType="username"
                            placeholderText="Användarnamn"
                            iconComponent={
                                <Ionicons
                                    name="person-outline"
                                    size={28}
                                    color={COLORS.cyan}
                                />
                            }
                        />
                        <FormField
                            title="Lösenord"
                            value={form.password}
                            handleChangeText={(e: string) =>
                                handleInputChange("password", e)
                            }
                            keyboardType="password"
                            placeholderText="Lösenord"
                            iconComponent={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={28}
                                    color={COLORS.cyan}
                                />
                            }
                        />
                        <FormField
                            title="Upprepa Lösenord"
                            value={form.repeatPassword}
                            handleChangeText={(e: string) =>
                                handleInputChange("repeatPassword", e)
                            }
                            keyboardType="password"
                            placeholderText="Upprepa lösenord"
                            iconComponent={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={28}
                                    color={COLORS.cyan}
                                />
                            }
                        />
                        <CustomButton
                            title={"Skapa Konto"}
                            handlePress={() =>
                                handleSignUp({
                                    email: form.email,
                                    password: form.password,
                                    setIsLoading,
                                    userName: form.username,
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

export default SignUp;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.ebony,
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        paddingTop: 30,
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
    formContainer: {
        width: "100%",
        paddingTop: 50,
        gap: 25,
    },
});
