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

//TODO: add loading when waiting for catches

const Profile = () => {
    const { firestoreUser } = useAuthStore((state) => state);
    const [userCatches, setUserCatches] = useState<Catch[]>([]);
    const [totalCatches, setTotalCatches] = useState(null);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchInitialCatches = async () => {
        setLoading(true);
        if (!firestoreUser?.uid) {
            setLoading(false);
            return;
        }

        const { userCatches, lastDoc, hasMore } =
            await CatchesService.fetchCatchesWithUidLazy(
                firestoreUser.uid,
                null
            );
        // await UsersService.fetchLoggedInUser(firestoreUser.uid);
        const totalCatches = await CatchesService.fetchTotalCatches(
            firestoreUser.uid
        );
        setUserCatches(userCatches);
        setTotalCatches(totalCatches);
        setLastDoc(lastDoc);
        setHasMore(hasMore);
        setLoading(false);
    };

    const fetchMoreCatches = async () => {
        if (!hasMore || loading || !firestoreUser?.uid) return;
        setLoading(true);
        const {
            userCatches: newCatches,
            lastDoc: newLastDoc,
            hasMore: moreData,
        } = await CatchesService.fetchCatchesWithUidLazy(
            firestoreUser.uid,
            lastDoc
        );
        setUserCatches((prev) => [...prev, ...newCatches]);
        setLastDoc(newLastDoc);
        setHasMore(moreData);
        setLoading(false);
    };

    //Helper function
    const handleRefresh = async () => {
        handleRefreshHelper({
            setRefreshing,
            fetchFunction: fetchInitialCatches,
        });
    };

    useEffect(() => {
        if (firestoreUser?.uid) {
            console.log(
                "📢 Fetching catches for user lazy:",
                firestoreUser.uid
            );
            fetchInitialCatches();
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
