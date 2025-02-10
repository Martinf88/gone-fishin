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

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Gone Fishin'</Text>
                    <View style={{ width: "100%", paddingHorizontal: 40 }}>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, email: e })
                            }
                            otherStyles={{ marginTop: 50 }}
                            keyBoardType="example@example.com"
                            palceholderText="enter your email"
                            iconComponent={
                                <MaterialIcons
                                    name="alternate-email"
                                    size={32}
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
                            otherStyles={{ marginTop: 50 }}
                            keyBoardType="password"
                            palceholderText="enter your password"
                            iconComponent={
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={32}
                                    color={COLORS.primary}
                                    backgroundColor={COLORS.blueGray}
                                    style={styles.icon}
                                />
                            }
                        />
                        <Text
                            style={{
                                color: COLORS.pewter,
                                textAlign: "right",
                            }}
                        >
                            Glömt lösenordet?
                        </Text>
                    </View>

                    <CustomButton
                        title={"Logga In"}
                        handlePress={() =>
                            handleSignIn(form.email, form.password)
                        }
                        containerStyles={{ marginTop: 100 }}
                    />
                </View>
            </ScrollView>
            <StatusBar style="light" backgroundColor={COLORS.primary} />
        </SafeAreaView>
    );
};

export default SignIn;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        alignItems: "center",
        width: "100%",
        minHeight: height * 0.85,
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: COLORS.darkBlue,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    icon: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 6,
        height: "100%",
    },
});
