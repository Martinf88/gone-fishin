import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "@/components/CustomHeader";

const Feed = () => {
    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <CustomHeader title={"Flöde"} showButtons={false} />
            <View style={styles.container}>
                <Text style={styles.text}>Flöde</Text>
            </View>
            <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
        </SafeAreaView>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: COLORS.pewter,
    },
});
