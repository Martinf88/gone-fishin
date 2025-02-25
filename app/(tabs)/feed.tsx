import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CustomHeader from "@/components/common/CustomHeader";
import CatchList from "@/components/common/CatchList";
import { useAuthStore } from "@/store/useStore";
import { DocumentSnapshot } from "firebase/firestore";
import { Catch } from "@/types/types";
import CatchesService from "@/services/catches";

//TODO: add loading when waiting for catches

const Feed = () => {
    const { fetchAllUsers } = useAuthStore((state) => state);
    const [catches, setCatches] = useState<Catch[]>([]);
    const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchInitialCatches = async () => {
        setLoading(true);
        const { catches, lastDoc, hasMore } =
            await CatchesService.fetchCatchesLazy(null);
        setCatches(catches);
        setLastDoc(lastDoc);
        setHasMore(hasMore);
        setLoading(false);
    };

    const fetchMoreCatches = async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        const {
            catches: newCatches,
            lastDoc: newLastDoc,
            hasMore: moreData,
        } = await CatchesService.fetchCatchesLazy(lastDoc);
        setCatches((prev) => [...prev, ...newCatches]);
        setLastDoc(newLastDoc);
        setHasMore(moreData);
        setLoading(false);
    };

    useEffect(() => {
        console.log("📢 Fetching all catches lazy and users for feed", {
            catches,
        });
        fetchInitialCatches();
        fetchAllUsers();
    }, []);

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.primary, height: "100%" }}
        >
            <CustomHeader title={"Flöde"} showButtons={false} />
            <View style={styles.container}>
                <CatchList
                    catches={catches}
                    loading={loading}
                    fetchMoreCatches={fetchMoreCatches}
                />
            </View>
            <StatusBar style="light" backgroundColor={COLORS.secondary} />
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
        color: COLORS.white,
    },
});
