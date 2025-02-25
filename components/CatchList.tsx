import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { Catch } from "@/types/types";
import CatchCard from "./CatchCard";
import { useAuthStore } from "@/store/useStore";
import { COLORS } from "@/constants/Colors";

interface CatchListProps {
    catches: Catch[];
    loading: boolean;
    fetchMoreCatches: () => void;
}

const CatchList = ({ catches, loading, fetchMoreCatches }: CatchListProps) => {
    const { allUsers } = useAuthStore((state) => state);

    const getUserName = (userId: string) => {
        const user = allUsers.find((user) => user.uid === userId);
        return user?.userName ?? "Okänd användare";
    };
    return (
        <FlatList
            data={catches}
            keyExtractor={(item) => item.catchId}
            renderItem={({ item }) => (
                <CatchCard
                    catchData={item}
                    username={getUserName(item.userId)}
                />
            )}
            onEndReached={fetchMoreCatches}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loading ? (
                    <ActivityIndicator size="large" color={COLORS.secondary} />
                ) : null
            }
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default CatchList;

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
});
