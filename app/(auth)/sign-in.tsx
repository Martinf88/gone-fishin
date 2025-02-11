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
import { handleSignIn } from "@/utils/auth";
import { Link } from "expo-router";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "klasse@test.com",
        password: "klasse",
    });
    const [isLoading, setIsLoading] = useState(false);

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Gone Fishin'</Text>

                    <View>
                        <ActivityIndicator size="large" color={COLORS.yellow} />
                    </View>

                    <View style={{ width: "100%" }}>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e: string) =>
                                setForm({ ...form, email: e })
                            }
                            otherStyles={{ marginTop: 80 }}
                            keyBoardType="email"
                            palceholderText="example@example.com"
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
                            otherStyles={{ marginTop: 20 }}
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
                    </View>

                    <CustomButton
                        title={"Logga In"}
                        handlePress={() =>
                            handleSignIn({
                                email: form.email,
                                password: form.password,
                                setIsLoading: setIsLoading,
                            })
                        }
                        containerStyles={{ marginTop: 20 }}
                        isLoading={isLoading}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            justifyContent: "center",
                            gap: 5,
                        }}
                    >
                        <Text style={{ color: COLORS.pewter, fontSize: 16 }}>
                            Saknar du konto?
                        </Text>
                        <Link href="/sign-up">
                            <Text
                                style={{
                                    color: COLORS.yellow,
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Registrera dig
                            </Text>
                        </Link>
                    </View>
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
        paddingHorizontal: 20,
        width: "100%",
        minHeight: height * 0.85,
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
        textAlign: "center",
    },

    icon: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 9,
    },
});
