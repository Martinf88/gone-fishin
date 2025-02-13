import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/useAuthStore";
//TODO: fetch catches with lazy loading
const Profile = () => {
    const user = useAuthStore((state) => state.firestoreUser);
    return (
        <>
            <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
            <SafeAreaView style={styles.safeArea}>
                <CustomHeader title={user?.userName} showButtons={true} />
                <View style={styles.container}>
                    <UserCard />
                </View>
            </SafeAreaView>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.primary,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    text: {
        color: COLORS.pewter,
    },
});
