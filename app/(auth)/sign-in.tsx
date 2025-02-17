import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { handleSignIn } from "@/services/handlers";
import { Link } from "expo-router";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "abborren@abborren.com",
        password: "abborren",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: "email" | "password", value: string) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Gone Fishin'</Text>
                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator
                                size="large"
                                color={COLORS.yellow}
                            />
                        </View>
                    )}

                    <View style={styles.formContainer}>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: string) =>
                                handleInputChange("email", e)
                            }
                            otherStyles={{ marginTop: 80 }}
                            keyboardType="email-adress"
                            placeholderText="example@example.com"
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
                            title="Lösenord"
                            value={form.password}
                            handleChangeText={(e: string) =>
                                handleInputChange("password", e)
                            }
                            otherStyles={{ marginTop: 20 }}
                            keyboardType="password"
                            placeholderText="Enter your password"
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
                    </View>

                    <CustomButton
                        title={"Logga In"}
                        handlePress={() =>
                            handleSignIn({
                                email: form.email,
                                password: form.password,
                                setIsLoading,
                            })
                        }
                        containerStyles={{ marginTop: 20 }}
                        isLoading={isLoading}
                    />
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>
                            Saknar du konto?
                        </Text>
                        <Link href="/sign-up">
                            <Text style={styles.registerLink}>
                                Registrera dig
                            </Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default SignIn;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        paddingTop: 100,
        paddingHorizontal: 20,
        width: "100%",
        minHeight: height * 0.85,
        position: "relative",
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
        textAlign: "center",
    },
    loadingContainer: {
        position: "absolute",
        left: "50%",
        top: "60%",
        zIndex: 2,
    },
    formContainer: { width: "100%" },
    registerContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "center",
        gap: 5,
    },
    registerText: {
        color: COLORS.pewter,
        fontSize: 16,
    },
    registerLink: {
        color: COLORS.yellow,
        fontSize: 16,
        fontWeight: "bold",
    },
    icon: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 9,
    },
});
