import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";

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
                            style={{ marginTop: 20 }}
                            source={require("@/assets/images/polaroid.png")}
                        />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <CustomButton text={"Logga in"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
    subTitle: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 24,
        color: COLORS.blueGray,
        fontFamily: "Kurale-Regular",
    },

    buttonWrapper: {
        marginBottom: 100,
    },
});
