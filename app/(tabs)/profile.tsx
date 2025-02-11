import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";

const Profile = () => {
    return (
        <>
            <CustomHeader title={"Profil"} showButtons={true} />
            <View style={styles.container}>
                <Text style={styles.text}>Profile</Text>
            </View>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.pewter,
    },
});
