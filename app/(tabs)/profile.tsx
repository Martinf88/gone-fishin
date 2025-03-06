import { RefreshControl, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/common/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/useStore";
import CatchList from "@/components/common/CatchList";
import { Catch } from "@/types/types";
import { DocumentSnapshot } from "firebase/firestore";
import CatchesService from "@/services/catches";
import UserCard from "@/components/user-card/UserCard";
import { handleRefreshHelper } from "@/helper-functions/handleRefresh";

const Profile = () => {
    const { firestoreUser } = useAuthStore((state) => state);
    const [userCatches, setUserCatches] = useState<Catch[]>([]);
    const [totalCatches, setTotalCatches] = useState<number | null>(null);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchInitialCatches = async () => {
        setLoading(true);
        console.log("📢 Fetching initial catches...");

        if (!firestoreUser?.uid) {
            console.warn("🚨 No `firestoreUser` found, exiting function.");
            console.log("Debug `firestoreUser`:", firestoreUser);
            setLoading(false);
            return;
        }

        console.log("✅ Found `firestoreUser.uid`:", firestoreUser.uid);

        try {
            const { userCatches, lastDoc, hasMore } =
                await CatchesService.fetchCatchesWithUidLazy(
                    firestoreUser.uid,
                    null
                );

            console.log("📤 Received catches:", userCatches);
            console.log("📤 Last document:", lastDoc);
            console.log("📤 More catches available?", hasMore);

            const totalCatches = await CatchesService.fetchTotalCatches(
                firestoreUser.uid
            );

            console.log("🎯 Total catches for user:", totalCatches);

            setUserCatches(userCatches);
            setTotalCatches(totalCatches);
            setLastDoc(lastDoc);
            setHasMore(hasMore);
        } catch (error) {
            console.error("❌ Error fetching catches:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMoreCatches = async () => {
        if (!hasMore || loading || !firestoreUser?.uid) {
            console.warn("🚨 Skipping `fetchMoreCatches`. Conditions not met.");
            return;
        }

        setLoading(true);
        console.log("📢 Fetching more catches...");

        try {
            const {
                userCatches: newCatches,
                lastDoc: newLastDoc,
                hasMore: moreData,
            } = await CatchesService.fetchCatchesWithUidLazy(
                firestoreUser.uid,
                lastDoc
            );

            console.log("📤 New catches received:", newCatches);
            console.log("📤 Updated last document:", newLastDoc);
            console.log("📤 More catches available?", moreData);

            setUserCatches((prev) => [...prev, ...newCatches]);
            setLastDoc(newLastDoc);
            setHasMore(moreData);
        } catch (error) {
            console.error("❌ Error fetching more catches:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper function for refreshing
    const handleRefresh = async () => {
        console.log("🔄 Refreshing profile data...");
        handleRefreshHelper({
            setRefreshing,
            fetchFunction: fetchInitialCatches,
        });
    };

    useEffect(() => {
        if (firestoreUser?.uid) {
            console.log(
                "📢 useEffect - Fetching user catches:",
                firestoreUser.uid
            );
            fetchInitialCatches();
        } else {
            console.warn(
                "🚨 No `firestoreUser.uid` in useEffect, skipping fetch."
            );
        }
    }, [firestoreUser]);

    return (
        <>
            <StatusBar style="light" backgroundColor={COLORS.secondary} />
            <SafeAreaView style={styles.safeArea}>
                <CustomHeader title={"Profil"} showButtons={true} />

                <View style={styles.container}>
                    <CatchList
                        fetchMoreCatches={fetchMoreCatches}
                        catches={userCatches}
                        loading={loading}
                        headerComponent={
                            <UserCard totalCatches={totalCatches} />
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={[COLORS.primary]}
                                progressBackgroundColor={COLORS.white}
                            />
                        }
                    />
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
        color: COLORS.white,
    },
});
