import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/useAuthStore";
import CatchCard from "@/components/CatchCard";
//TODO: fetch catches with lazy loading
const Profile = () => {
    const firestoreUser = useAuthStore((state) => state.firestoreUser);
    const fetchUserCatches = useAuthStore((state) => state.fetchUserCatches);

    useEffect(() => {
        if (firestoreUser?.uid) {
            console.log("📢 Fetching catches for user:", firestoreUser.uid);
            fetchUserCatches();
        }
    }, [firestoreUser]);
    return (
        <>
            <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
            <SafeAreaView style={styles.safeArea}>
                <CustomHeader
                    title={firestoreUser?.userName}
                    showButtons={true}
                />
                <View style={styles.container}>
                    <UserCard />
                    <CatchCard />
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
