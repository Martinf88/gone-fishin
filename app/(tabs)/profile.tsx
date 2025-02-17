import { ScrollView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/useAuthStore";
import CatchCard from "@/components/CatchCard";
import CatchList from "@/components/CatchList";
//TODO: fetch catches with lazy loading
const Profile = () => {
    const { profileCatches, firestoreUser, fetchUserCatches } = useAuthStore(
        (state) => state
    );

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
                <ScrollView>
                    <View style={styles.container}>
                        <UserCard />
                        <CatchList
                            catches={profileCatches}
                            username={firestoreUser?.userName}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.darkBlue,
        flex: 1,
    },
    container: {
        flex: 1,
    },
    text: {
        color: COLORS.pewter,
    },
});
