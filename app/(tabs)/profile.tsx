import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import CustomHeader from "@/components/common/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UserCard from "@/components/UserCard";
import { useAuthStore } from "@/store/useStore";
import CatchList from "@/components/common/CatchList";
import { Catch } from "@/types/types";
import { DocumentSnapshot } from "firebase/firestore";
import CatchesService from "@/services/catches";
const Profile = () => {
    const { firestoreUser } = useAuthStore((state) => state);
    const [userCatches, setUserCatches] = useState<Catch[]>([]);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

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
        setUserCatches(userCatches);
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
                <CustomHeader
                    title={firestoreUser?.userName}
                    showButtons={true}
                />

                <View style={styles.container}>
                    <UserCard />
                    <CatchList
                        fetchMoreCatches={fetchMoreCatches}
                        catches={userCatches}
                        loading={loading}
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
