import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "@/components/CustomHeader";
import CatchList from "@/components/CatchList";
import { useAuthStore } from "@/store/useStore";

const Feed = () => {
    const { feedCatches, fetchAllCatches, fetchAllUsers } = useAuthStore(
        (state) => state
    );
    useEffect(() => {
        console.log("📢 Fetching all catches and users for feed", {
            feedCatches,
        });
        fetchAllCatches();
        fetchAllUsers();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.ebony, height: "100%" }}>
            <CustomHeader title={"Flöde"} showButtons={false} />
            <View style={styles.container}>
                <CatchList catches={feedCatches} />
            </View>
            <StatusBar style="light" backgroundColor={COLORS.cyan} />
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
