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
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const App = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.heroSection}>
                        <Text style={styles.title}>Gone Fishin'</Text>
                        <Text style={styles.subTitle}>
                            Din digitala fiskedagbok.
                        </Text>
                        <Image
                            style={styles.image}
                            source={require("@/assets/images/polaroid-2.png")}
                        />
                    </View>

                    <Link href="/sign-in">
                        <Text style={styles.linkText}>Kom igång</Text>
                    </Link>
                </View>
            </ScrollView>
            <StatusBar style="light" />
        </SafeAreaView>
    );
};

export default App;

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.ebony,
        height: "100%",
    },
    scrollView: {
        height: "100%",
    },
    container: {
        paddingTop: 100,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        minHeight: height * 0.85,
    },
    heroSection: {
        alignItems: "center",
    },
    title: {
        fontSize: 54,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
    subTitle: {
        textAlign: "center",
        fontSize: 24,
        color: COLORS.mistyBlue,
        fontFamily: "Kurale-Regular",
    },
    image: {
        marginTop: 50,
    },
    linkText: {
        color: COLORS.yellow,
        fontSize: 20,
        textDecorationLine: "underline",
    },
});
