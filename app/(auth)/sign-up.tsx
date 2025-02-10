import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSignIn } from "@/utils/auth";
import { Link } from "expo-router";

const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Gone Fishin'</Text>
                    <View style={{ width: "100%", paddingTop: 50, gap: 25 }}>
                        <Text style={styles.subTitle}>Skapa konto</Text>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, email: e })
                            }
                            keyBoardType="email"
                            palceholderText="example@example.com"
                            iconComponent={
                                <MaterialIcons
                                    name="alternate-email"
                                    size={28}
                                    color={COLORS.primary}
                                    backgroundColor={COLORS.blueGray}
                                    style={styles.icon}
                                />
                            }
                        />
                        <FormField
                            title="username"
                            value={form.username}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, username: e })
                            }
                            keyBoardType="username"
                            palceholderText="Användarnamn"
                            iconComponent={
                                <Ionicons
                                    name="person-outline"
                                    size={28}
                                    color={COLORS.primary}
                                    backgroundColor={COLORS.blueGray}
                                    style={styles.icon}
                                />
                            }
                        />
                        <FormField
                            title="Password"
                            value={form.password}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, password: e })
                            }
                            keyBoardType="password"
                            palceholderText="Lösenord"
                            iconComponent={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={28}
                                    color={COLORS.primary}
                                    backgroundColor={COLORS.blueGray}
                                    style={styles.icon}
                                />
                            }
                        />
                        <FormField
                            title="Password"
                            value={form.repeatPassword}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, repeatPassword: e })
                            }
                            keyBoardType="password"
                            palceholderText="Upprepa lösenord"
                            iconComponent={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={28}
                                    color={COLORS.primary}
                                    backgroundColor={COLORS.blueGray}
                                    style={styles.icon}
                                />
                            }
                        />
                        <CustomButton
                            title={"Skapa Konto"}
                            handlePress={() =>
                                handleSignIn(
                                    form.email,
                                    form.password,
                                    setIsLoading
                                )
                            }
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
        </SafeAreaView>
    );
};

export default SignUp;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
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
        // fontFamily: "Kurale-Regular",
        fontWeight: "bold",
    },

    icon: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 11,
    },
});
