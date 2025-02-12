import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <CustomHeader title={"Profil"} showButtons={true} />
            <View style={styles.container}>
                <Text style={styles.text}>Profil</Text>
            </View>
            <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
        </SafeAreaView>
    );
};

export default Profile;

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
