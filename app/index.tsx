import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const App = () => {
    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View style={styles.container}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Gone Fishin'</Text>

                        <Text style={styles.subTitle}>
                            Din digitala fiskedagbok.
                        </Text>
                        <Image
                            style={{ marginTop: 50 }}
                            source={require("@/assets/images/polaroid-2.png")}
                        />
                    </View>

                    <CustomButton
                        title={"Gå vidare"}
                        handlePress={() => {
                            router.push("/sign-in");
                        }}
                    />
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default App;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        minHeight: height * 0.85,
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
    subTitle: {
        textAlign: "center",
        fontSize: 24,
        color: COLORS.blueGray,
        fontFamily: "Kurale-Regular",
    },
});
